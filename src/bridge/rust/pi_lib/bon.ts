
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
export class ReadBuffer extends NObject{
    static _$info = new SInfo("ReadBuffer", 1328530014 , new Map(), []);
}