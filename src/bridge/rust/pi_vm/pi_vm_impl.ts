
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {NativeObjsAuth} from "./bonmgr"
import {Vec} from "../def/vec"
export class VMFactory extends NObject{
    static _$info = new SInfo("VMFactory", 1373771230 , new Map(), []);    
    
    static new = (size:number,auth:NativeObjsAuth): VMFactory => {               
        (<any>auth) = auth.self;
        
        let result = call(2222376158,[ size,auth ]);     
        (<any>result) = new VMFactory(result);
        
        return result; 
    }    
    
    append = (code:Vec): VMFactory => {          
        (<any>code) = code.self;
        
        let result = call(1487978276,[ this.self,code ]);     
        (<any>result) = new VMFactory(result);
        
        return result; 
    }
}