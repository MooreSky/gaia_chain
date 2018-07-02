
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo} from "../../../pi/struct/sinfo";
import {Vec} from "../def/vec"
export class VMChannel extends NObject{
    static _$info = new StructInfo("VMChannel", 3552256106 , new Map(), []);    
    
    
    response = (callback:number,result:Vec,native_objs:Vec): boolean => {               
        (<any>result) = result.self;
             
        (<any>native_objs) = native_objs.self;
        
        return call(1350440529,[ this.self,callback,result,native_objs ]); 
    }
}