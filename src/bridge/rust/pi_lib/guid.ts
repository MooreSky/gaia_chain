
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
export class GuidGen extends NObject{
    static _$info = new SInfo("GuidGen", 1736136244 , new Map(), []);    
    
    static new = (node_time:bigInt.BigInteger,node_id:number): GuidGen => {          
        (<any>node_time) = u64ToBuffer(node_time);
             
        let result = call(1469354144,[ node_time,node_id ]);     
        (<any>result) = new GuidGen(result);
        
        return result; 
    }
}