
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
import {Atom} from "./atom"
export class StructInfo extends NObject{
    static _$info = new SInfo("StructInfo", 2453199836 , new Map(), []);    
    
    static new = (name:Atom,name_hash:number): StructInfo => {          
        (<any>name) = name.self;
             
        let result = call(748243846,[ name,name_hash ]);     
        (<any>result) = new StructInfo(result);
        
        return result; 
    }
}