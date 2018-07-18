
/**
 * Database
 */

// ============================== import

import { BonBuffer } from "../../pi/util/bon"

import { Mgr, Tr } from "../../bridge/rust/pi_db/mgr"
import { TabKV } from "../../bridge/rust/pi_db/db"
import { Vec } from "../../bridge/rust/def/vec"
import { MemeryDB } from "../../bridge/rust/pi_db/memery_db"
import { read, write, Handler } from "../../bridge/db"
import { Atom } from "../../bridge/rust/pi_lib/atom"
import * as jsCall from "../../bridge/rust/pi_serv/js_call"
import { write as serde, read as deserde } from "../../pi/struct/util"
import { structMgr } from "../../bridge/init/init_cfg"

// ============================== export

export { Tr } from "../../bridge/rust/pi_db/mgr"

/**
 * TODO: FileDB is coming soon
 */
export enum DatabaseType {
    Memory = "memory",
}

/**
 * query from db
 */
export const readDB = (handler: Handler) => {
    read(s_database_mgr, handler);
}

/**
 * set to db
 */
export const writeDB = (handler: Handler) => {
    write(s_database_mgr, handler);
}

/**
 * create database with name
 */
export const createDatabase = (type: DatabaseType, name: string) => {
    let db = null;
    switch (type) {
        case DatabaseType.Memory:
            db = MemeryDB.new();
            break;
        default:
            throw new Error("createDatabase, type invalid: " + type);
    }

    let r = false;
    if (db) {
        r = jsCall.register_memery_db(s_database_mgr, name, db);
    }
    return r;
}

/**
 * give tableName, create data table in database dbName 
 */
export const createTable = (tr: Tr, dbName: string, tableNames: string[]) => {
    for (let name of tableNames) {
        let info = jsCall.create_sinfo(new BonBuffer().getBuffer());
        let r = tr.alter(Atom.from_From(dbName), Atom.from_From(name), info);
        // TODO: when table is already exist, r is Error
    }
    return true;
}

/**
 * delete data table
 */
export const deleteTable = (tr: Tr, dbName: string, tableName: string) => {
    return tr.alter(Atom.from_From(dbName), Atom.from_From(tableName), null);
}

/**
 * query values with keys
 * @returns boolean indicate that operation is ok
 */
export const queryItems = (tr: Tr, dbName: string, tableName: string, keys: any[]) => {

    let items = Vec.new_TabKV();

    for (let key of keys) {
        let bb = new BonBuffer();
        serde(key, bb);
        let item = jsCall.tabkv_new(dbName, tableName, bb.getBuffer());
        items.push_TabKV(item);
    }

    let r = tr.query(items, 0, false);
    if (r instanceof Error) {
        return;
    }

    let result = [];
    let kvs = (<Vec>r).as_slice_TabKV();
    for (let i = 0; i < kvs.length; i++) {
        let u8Arr = getKVValue(kvs[i]);
        result.push(deserde(new BonBuffer(u8Arr), structMgr));
    }
    return result;
}

/**
 * @return {boolean} indicate that writing data is ok
 */
export const setItems = (tr: Tr, dbName: string, tableName: string, kvs: [any, any][]) => {
    let items = Vec.new_TabKV();
    for (let [k, v] of kvs) {
        let kBuffer = new BonBuffer();
        serde(k, kBuffer);
        let kArr = kBuffer.getBuffer();

        let vBuffer = new BonBuffer();
        serde(v, vBuffer);
        let vArr = vBuffer.getBuffer();

        let item = jsCall.tabkv_with_value(dbName, tableName, kArr, vArr);
        items.push_TabKV(item);
    }

    let r = tr.modify(items, 0, false);
    return !(r instanceof Error);
}

/**
 * remove items with keys
 * @return {boolean} indicate that writing data is ok
 */
export const removeItems = (tr: Tr, dbName: string, tableName: string, keys: any[]) => {
    let items = Vec.new_TabKV();
    for (let key of keys) {
        let bb = new BonBuffer();
        serde(key, bb);
        let item = jsCall.tabkv_new(dbName, tableName, bb.getBuffer());
        items.push_TabKV(item);
    }

    let r = tr.modify(items, 0, false);
    return !(r instanceof Error);
}

/**
 * iterate the tableName 
 */
export const iterItems = (tr: Tr, dbName: string, tableName: string, cb: IterCB) => {
    let iter = jsCall.iter_db(tr, dbName, tableName, null, false, null);
    if (iter instanceof Error) {
        return;
    }

    let continued = true;
    while (continued) {
        let kv = iterKV(iter);
        if (kv instanceof Error) {
            continued = false;
        }
        cb(kv[0], kv[1]);
    }
}

// ============================== implment

// from rust
declare const db_mgr: any;
let s_database_mgr = new Mgr(db_mgr);

type IterCB = (key: Uint8Array, value: Uint8Array) => void;

const getKVValue = (kv: TabKV) => {
    let vec = jsCall.tabkv_get_value(kv);
    let vecImpl = jsCall.arc_deref_Vec(vec);
    let r = vecImpl.as_slice_u8();
    return r;
}

const iterKV = (iter: jsCall.DBIter): Error | [Uint8Array, Uint8Array] => {
    let elem = iter.next();
    if (elem instanceof Error) {
        return elem;
    }

    let key = jsCall.arc_deref_Vec(elem[0]);
    let value = jsCall.arc_deref_Vec(elem[1]);
    return [key.as_slice_u8(), value.as_slice_u8()];
}