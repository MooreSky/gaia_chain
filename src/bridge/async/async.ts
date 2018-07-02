/**
 * 异步调用模块， 负责发起调用的参数序列化， 接收请求的参数反序列化， 函数调用， 调用返回值的序列化， 收到回应值的反序列化
 * 最多支持10个参数， 参数中， 不能将一个NativeObject嵌套在一个复杂类型内部
 * 返回值也不能将NativeObject嵌套在一个复杂类型内部
 */

declare var _$structMgr;
declare var pi_modules;
import {NativeObject, callbacks} from "../vm/vm";
import {BonBuffer, SerializeType} from "../../pi/util/bon";
import {read, write} from "../../pi/struct/util";
import {StructMgr} from "../../pi/struct/struct_mgr";
import {Mgr} from "../rust/pi_db/mgr";

let structMgr = _$structMgr as StructMgr;
export const call = (name: string, args: Array<SerializeType>, callback: any) => {
    let back = (r: Uint8Array, nobjs:Array<any>) => {
        callback(readany(new BonBuffer(r), nobjs));//解析返回值， 调用回调
    }
    //序列化参数
    let index = callbacks.register(back);
    let bb = new BonBuffer();
    let nobjs = [];
    writeArray(args, bb, nobjs);

    //异步嗲用
    NativeObject.call(1, [name, bb.getBuffer(), nobjs, index]);
}

const request = (path: string, args: Uint8Array, callbackIndex: number, nobjs:Array<any>, mgr:any, vmChannel: any) => {
    (<any>self)._$db_mgr = Mgr.new(mgr);//将mgr定义到全局域上

    //解析接口路径
    let index = path.lastIndexOf(".");
    let mod = path.slice(0, index) + ".r";
    let funName = path.slice(index + 1, path.length);
    //参数解析
    let arr = readArray(new BonBuffer(args), nobjs);
    //调用函数
    let r = fnMap[arr?arr.length:0](pi_modules[mod].exports[funName], arr);
    //返回值序列化
    let bbr = new BonBuffer();
    let nobj = writeany(bbr, r, 0);
    //回应请求
    NativeObject.call(2, [vmChannel, bbr.getBuffer(), [nobj], callbackIndex]);
}

const writeany = (bb: BonBuffer, el: any, index?: number): NativeObject | void => {
    if(el instanceof NativeObject){
        bb.writeU8(255); //nativeObject类型是255
        bb.writeU32((<any>el.constructor)._$info.name_hash);//写hash
        bb.writeInt(index);//写index
        return bb;
    }else{
        write(el, bb);//写其他类型
    }
}

const readany = (bb: BonBuffer, nobjs: Array<any>): any => {
    let t = bb.getType();
    if(t === 255){
        bb.readU8();
        let t_hash = bb.readU32();
        let index = bb.readInt();
        let meta = structMgr.lookup(t_hash);
        return new meta.construct(nobjs[index]);
    }else{
        return read(bb, structMgr);
    }
}

//写入一个数组
const writeArray = (o: Array<any>, bb: BonBuffer, nobjs: Array<any>) => {
    let i = 0;
    if(!o){
        bb.writeNil();
    }else{
        bb.writeCt(o, () => {
            bb.writeArray(o, (el) => {
                //写NativeObject
                let r = writeany(bb, el, i);
                if(r){
                    nobjs.push(r);
                    i++;
                }
            });
        });
    }
}

//读一个数组， 只有在确信bb中的下一个元素是数组或null是使用
const readArray = (bb: BonBuffer, nobjs: Array<any>): any => {
    let t = bb.getType();
    if(t === 0){
        return null;
    }

    return bb.readArray(() => {
        return readany(bb, nobjs);
    });
}

//根据参数个数不同， 使用不同的调用方式
let fnMap = {
    0:(f: any, _args?: any) =>{
        return f()
    },
    1:(f: any,  args: Array<any>) =>{
        return f(args[0])
    },
    2:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1])
    },
    3:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2])
    },
    4:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3])
    },
    5:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4])
    },
    6:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4], args[5])
    },
    7:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
    },
    8:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])
    },
    9:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8])
    },
    10:(f: any,  args: Array<any>) =>{
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
    }
};

(<any>self)._$async = request;//将异步调用请求接收接口定义到全局上， 供底层调用