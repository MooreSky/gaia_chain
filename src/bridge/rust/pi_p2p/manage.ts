
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
export class P2PManage extends NObject{
    static _$info = new SInfo("P2PManage", 2957730883 , new Map(), []);    
    
    connect = () => {     
        call(2634481422,[ this.self ]);
    }    
    
    connectAddr = (addr:string) => {          
        call(338675993,[ this.self,addr ]);
    }    
    
    broadcastAddr = () => {     
        call(696058749,[ this.self ]);
    }
}