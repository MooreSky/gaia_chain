/**
 * 异步调用模块， 负责发起调用的参数序列化， 接收请求的参数反序列化， 函数调用， 调用返回值的序列化， 收到回应值的反序列化
 * 最多支持10个参数， 参数中， 不能将一个NativeObject嵌套在一个复杂类型内部
 * 返回值也不能将NativeObject嵌套在一个复杂类型内部
 */
import {NativeObject, callbacks} from "../vm/vm";
import {BonBuffer, SerializeType} from "../../pi/util/bon";
import {readany, writeArray} from "./util";
import {__thread_yield} from "../vm/vm";

export const asyncCall = (name: string, args: Array<SerializeType>, callback: any) => {
    let back = (r: Uint8Array, nobjs:Array<any>) => {
        callback(readany(new BonBuffer(r), nobjs));//解析返回值， 调用回调
    }
    //序列化参数
    let index = callbacks.register(back);
    let bb = new BonBuffer();
    let nobjs = [];
    writeArray(args, bb, nobjs);
    //异步掉用
    NativeObject.call(1, [name, bb.getBuffer(), nobjs, index]);
}

export const syncCall = (name: string, args: Array<SerializeType>) => {
    let bb = new BonBuffer();
    let nobjs = [];
    writeArray(args, bb, nobjs);
    //阻塞步调用
    NativeObject.call(1, [name, bb.getBuffer(), nobjs, null]);
    let r = __thread_yield();
    return readany(new BonBuffer(r[0]), r[1]);
}