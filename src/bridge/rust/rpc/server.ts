
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo} from "../../../pi/struct/sinfo";
import {ServerNode} from "../mqtt/server"
export class RPCServer extends NObject{
    static _$info = new StructInfo("RPCServer", 3418977212 , new Map(), []);    
    
    
    static new = (mqtt:ServerNode): RPCServer => {          
        (<any>mqtt) = mqtt.self;
        
        let result = call(193751450,[ mqtt ]);     
        (<any>result) = new RPCServer(result);
        
        return result; 
    }
}