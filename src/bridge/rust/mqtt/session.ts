
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {Atom} from "../pi_lib/atom"
import {Vec} from "../def/vec"
export class Session extends NObject{
    static _$info = new SInfo("Session", 107216069 , new Map(), []);    
    
    respond = (_topic:Atom,msg:Vec) => {          
        (<any>_topic) = _topic.self;
             
        (<any>msg) = msg.self;
        
        call(3560614167,[ this.self,_topic,msg ]);
    }
}