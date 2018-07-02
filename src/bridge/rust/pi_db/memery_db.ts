
import {NativeObject, call, Error, syncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo} from "../../../pi/struct/sinfo";
export class MemeryDB extends NObject{
    static _$info = new StructInfo("MemeryDB", 2780396131 , new Map(), []);    
    
    
    static new = (): MemeryDB => {     
        let result = call(2432929176,[  ]);     
        (<any>result) = new MemeryDB(result);
        
        return result; 
    }
}