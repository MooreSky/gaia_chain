declare var pi_modules;
import {BonBuffer} from "../../pi/util/bon";
import {NObject} from "../vm/nobject";
import {read, write} from "../../pi/struct/util";
import {structMgr} from "../init/init_cfg";
import {NativeObject} from "../vm/vm";
import {Mgr} from "../rust/pi_db/mgr";

//写入一个数组
export const writeArray = (o: Array<any>, bb: BonBuffer, nobjs: Array<any>) => {
    let i = 0;
    if(!o){
        bb.writeNil();
    }else{
        bb.writeCt(o, () => {
            
            bb.writeU32(3);//数组类型
            bb.writeArray(o, (el) => {
                //写NativeObject
                let r = writeany(bb, el, i);
                if(r){
                    nobjs.push(r.self);
                    i++;
                }
            });
        });
    }
}

//读一个数组， 只有在确信bb中的下一个元素是数组或null是使用
export const readArray = (bb: BonBuffer, nobjs: Array<any>): any => {
    let t = bb.getType();
    if(t === 0){
        return null;
    }
    bb.readCt((bb, t) => {
        return bb.readArray(() => {
            return readany(bb, nobjs);
        });
    });
}

export const writeany = (bb: BonBuffer, el: any, index?: number): NObject | void => {
    if(el instanceof NObject){
        bb.writeU8(255); //nativeObject类型是255
        bb.writeU32((<any>el.constructor)._$info.name_hash);//写hash
        bb.writeInt(index);//写index
        return el;
    }else{
        write(el, bb);//写其他类型
    }
}

export const readany = (bb: BonBuffer, nobjs: Array<any>): any => {
    let t = bb.getType();
    if(t === 255){
        bb.readU8();
        let t_hash = bb.readU32();
        let index = bb.readInt();
        let meta = structMgr.lookup(t_hash);
        return new meta.construct(nobjs[index]);
    }else{
        let a = read(bb, structMgr);
        return a;
    }
}

//根据参数个数不同， 使用不同的调用方式
const fnMap = {
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

const request = (path: string, args: Uint8Array, nobjs:Array<any>, callbackIndex: number, mgr:any, vmChannel: any) => {
    (<any>self)._$db_mgr = new Mgr(mgr);//将mgr定义到全局域上
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

(<any>self)._$async = request;//将异步调用请求接收接口定义到全局上， 供底层调用