declare var pi_modules;

import {Struct, StructMgr} from "../../pi/struct/struct_mgr";
import { cfgMgr } from "../../pi/util/cfg";
import {Mgr, Tr} from "../rust/pi_db/mgr"
import {Vec} from "../rust/def/vec"
import { createSinfo, tabkvWithValue} from "../rust/pi_serv/js_call"
import {write} from "../db"
import {BonBuffer} from "../../pi/util/bon"
import { Atom } from "../rust/pi_lib/atom";
import {Depend} from "../rust/pi_serv/depend";
import { Error } from "../vm/vm";

export const db_mgr = new Mgr((<any>self)._$db_mgr);
export const depend = new Depend((<any>self)._$depend);
export const structMgr = new StructMgr();
for(var id in pi_modules){
	if(pi_modules.hasOwnProperty(id) && pi_modules[id].exports){
		for(var kk in pi_modules[id].exports){
			var c = pi_modules[id].exports[kk];
			if(Struct.isPrototypeOf(c) && c._$info){
				structMgr.register(c._$info.name_hash, c, id + "." + kk);
			}
		}
	}
}

// let memery_db = MemeryDB.new(); 
// register_memery_db(db_mgr, "memory", memery_db);
//把配置写入数据库
export const writeCfg = () => {
	cfgMgr.map.forEach((tab, k) => {
		if(k.indexOf("#") > -1){ //如果是主键表， 先不插入
			return;
        }

		let first: Struct;
        let writeData = Vec.newTabKV();
		tab.forEach((value, key) => {
			if(!first){
				first = value;
			}
			let keyBon = new BonBuffer();
			keyBon.writeInt(key as number);

			let valueBon = new BonBuffer();
            value.bonEncode(valueBon);
			writeData.pushTabKV(tabkvWithValue("memory", (<any>first.constructor)._$info.name,  keyBon.getBuffer(), valueBon.getBuffer()) );
		});

		write(db_mgr, (tr) => {
            let buf = new BonBuffer();
            (<any>first.constructor)._$info.bonEncode(buf);
            let r = tr.alter(Atom.fromFrom("memory"), Atom.fromFrom((<any>first.constructor)._$info.name), createSinfo(buf.getBuffer()));
			if(r instanceof Error){
				return r;
            }
            r = tr.modify(writeData, 1000, false);
			if(r instanceof Error){
				return r;
            }
        }); 
    });
    
    console.log("writecfg: ok");
}