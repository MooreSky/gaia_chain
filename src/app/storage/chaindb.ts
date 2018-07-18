
/**
 * Block Header DB
 */

// ============================== import

import { U64 } from "../util/bn"
import { H160, H256 } from "../util/hash"

import { BlockHeader } from "../chain/header"
import { Block } from "../chain/block"
import { Transaction } from "../chain/transaction"

import * as db from "../util/database"
import { u64ToBuffer } from "../../bridge/vm/vm";

// ============================== export

export type Tr = db.Tr;

export const openDatabase = () => {

    let r = db.createDatabase(db.DatabaseType.Memory, CHAIN_DB);
    if (!r) {
        return r;
    }

    let tableNames = [HEADER_TABLE, BLOCK_TABLE, TX_TABLE, HEIGHT_TO_HASH_TABLE, HASH_TO_HEIGHT_TABLE];

    db.writeDB(tr => {
        r = db.createTable(tr, HEADER_TABLE, tableNames);
    });
    return r;
}

export const getBlocksHeight = (tr: Tr, hashes: H256[]): U64[] => {
    return db.queryItems(tr, CHAIN_DB, HASH_TO_HEIGHT_TABLE, hashes);
}

export const getBlocksHash = (tr: Tr, heights: U64[]): H256[] => {
    return db.queryItems(tr, CHAIN_DB, HEIGHT_TO_HASH_TABLE, heights);
}

export const getHeadersByHash = (tr: Tr, hashes: H256[]): BlockHeader[] => {
    return db.queryItems(tr, CHAIN_DB, HEADER_TABLE, hashes);
}

export const getHeadersByHeight = (tr: Tr, heights: U64[]): BlockHeader[] => {
    let hashes = getBlocksHash(tr, heights);
    return getHeadersByHash(tr, hashes);
}

export const getBlocksByHash = (tr: Tr, hashes: H256[]): Block[] => {
    return db.queryItems(tr, CHAIN_DB, BLOCK_TABLE, hashes);
}

export const getBlocksByHeight = (tr: Tr, heights: U64[]): Block[] => {
    let hashes = getBlocksHash(tr, heights);
    return getBlocksByHash(tr, hashes);
}

export const getBlockTxHashes = (tr: Tr, blockHash: H256): H256[] => {
    let blocks: Block[] = getBlocksByHash(tr, [blockHash]);
    if (blocks) {
        return blocks[0].translations.map(tx => tx.txHash);
    }
}

export const getAccounts = (tr: Tr, addresses: H160[]): Account[] => {
    return db.queryItems(tr, CHAIN_DB, ACCOUNT_TABLE, addresses);
}

// ============================== implement

const CHAIN_DB = "ChainDB";

/**
 * Account Table
 *
 * K = H160 Account's Address
 * V = Account
 * 
 */
const ACCOUNT_TABLE = "AccountTable";

/**
 * Block Table
 *
 * K = H256 Header's hash
 * V = Block Header
 * 
 */
const HEADER_TABLE = "HeaderTable";

/**
 * Block Table
 *
 * K = H256 Header's hash
 * V = Block's Transactions
 * 
 */
const BLOCK_TABLE = "BlockTable";

/**
 * Translation Table
 * 
 * K = H256 Tx's hash
 * V = Transaction
 * 
 */
const TX_TABLE = "TransactionTable";

/**
 * Block Height-Hash Table
 *
 * K = Block's Height U64
 * V = Header's Hash H256
 * 
 */
const HEIGHT_TO_HASH_TABLE = "HeightToHashTable";

/**
 * Block Hash-Height Table
 *
 * K = Header's Hash H256
 * V = Block's Height U64
 * 
 */
const HASH_TO_HEIGHT_TABLE = "HashToHeightTable";
