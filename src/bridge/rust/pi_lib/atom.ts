
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
export class Atom extends NObject{
    static _$info = new SInfo("Atom", 913748025 , new Map(), []);    
    
    static fromFrom = (s:string): Atom => {          
        let result = call(1549520222,[ s ]);     
        (<any>result) = new Atom(result);
        
        return result; 
    }
}