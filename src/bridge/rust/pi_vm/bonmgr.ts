
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
export class NativeObjsAuth extends NObject{
    static _$info = new SInfo("NativeObjsAuth", 431458164 , new Map(), []);    
    
    static withNone = (): NativeObjsAuth => {     
        let result = call(54848988,[  ]);     
        (<any>result) = new NativeObjsAuth(result);
        
        return result; 
    }
}