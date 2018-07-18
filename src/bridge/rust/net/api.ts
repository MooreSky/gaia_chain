
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
export class NetManager extends NObject{
    static _$info = new SInfo("NetManager", 3179886960 , new Map(), []);    
    
    static new = (): NetManager => {     
        let result = call(1569890377,[  ]);     
        (<any>result) = new NetManager(result);
        
        return result; 
    }
}