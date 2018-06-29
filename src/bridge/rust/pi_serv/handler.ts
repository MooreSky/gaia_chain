
import {NativeObject, call, syncCall, callbacks, u128ToBuffer, u64ToBuffer} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../vm/biginteger";
import {VMFactory} from "../pi_vm/pi_vm_impl"
import {Mgr} from "../pi_db/mgr"
export class TopicHandler extends NObject{    
    
    
    static new = (len:number,factory:VMFactory,mgr:Mgr): TopicHandler => {               
        (<any>factory) = factory.self;
             
        (<any>mgr) = mgr.self;
        
        let result = call(3133367430,[ len,factory,mgr ]);     
        (<any>result) = new TopicHandler(result);
        
        return result; 
    }
}
export class AsyncRequestHandler extends NObject{    
    
    
    static new = (len:number,factory:VMFactory,mgr:Mgr): AsyncRequestHandler => {               
        (<any>factory) = factory.self;
             
        (<any>mgr) = mgr.self;
        
        let result = call(1272003303,[ len,factory,mgr ]);     
        (<any>result) = new AsyncRequestHandler(result);
        
        return result; 
    }
}