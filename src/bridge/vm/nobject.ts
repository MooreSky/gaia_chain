import {NativeObject} from "./vm";
import {Struct} from "../../pi/struct/struct_mgr";

export class NObject extends Struct{
    self: NativeObject;
    //static __genMeta?:any;//Json
    //__h:number;//类型hash
	constructor(self: NativeObject){
        super();
        this.self = self;
        //hash && (this.__meta = {hash:hash, gen:gen});
    }
}