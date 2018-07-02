
import {NativeObject, call, u128ToBuffer, u64ToBuffer} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo} from "../../../pi/struct/sinfo";
export class Atom extends NObject{
    static _$info = new StructInfo("Atom", 913748025 , new Map(), []);    
    
    
    static from_From = (s:string): Atom => {          
        let result = call(1549520222,[ s ]);     
        (<any>result) = new Atom(result);
        
        return result; 
    }
}