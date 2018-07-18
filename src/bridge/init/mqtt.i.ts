import {read} from "../db";
import {Vec} from "../rust/def/vec";
import {NetManager} from "../rust/net/api";
import {Mgr, Tr} from "../rust/pi_db/mgr";
import {RPCServer} from "../rust/rpc/server";
import {mqttBind, registerRpcHandler, iterDb, DBIter, getDepend, tabkvNew, arcDerefVec, tabkvGetValue, cloneVmFactory, arcNewTopicHandler, cloneDbMgr} from "../rust/pi_serv/js_call";
import {TopicHandler} from "../rust/pi_serv/handler";
import {cfgMgr} from "../../pi/util/cfg";
import {RpcMeta} from "../net/rpc_meta.s";
import {Error} from "../vm/vm";
import {VMFactory} from "../rust/pi_vm/pi_vm_impl";
import {NativeObjsAuth} from "../rust/pi_vm/bonmgr";
import {BonBuffer} from "../../pi/util/bon";
import {MqttCfg} from "./mqtt.s";
import {db_mgr, depend} from "./init_cfg";

//初始化mqtt服务
export const init = () => {
    console.log("init start");
    let cfg = cfgMgr.get("_$server_cfg").get(0) as MqttCfg;
    let netMgr = NetManager.new();
    let mqttServer = mqttBind(netMgr, cfg.addr, cfg.protocol, cfg.send_buf_size, cfg.recv_timeout);//创建mqtt服务
    let rpcServer = RPCServer.new(mqttServer);//创建rpc服务
    let map = new Map();
    read(db_mgr, (tr) => {
        let iter = iterDb(tr, "memory", RpcMeta._$info.name, null, false, null);
        let flag = true;
        if(iter instanceof Error){
            return iter;
        }
        while(flag){
            let el = (<DBIter>iter).next();
            if(el instanceof Error){
                return el;
            }
            if(!el){
                flag = false;
                continue;
            }
            let v8 = arcDerefVec(el[1]);
            let buf = v8.asSliceU8();
            let bb = new BonBuffer(buf);
            
            let rpc_meta = new RpcMeta();
            rpc_meta.bonDecode(bb);
            let topic = rpc_meta.path;
            let file = topic.slice(0, topic.lastIndexOf("."));
            let handler = map.get(file);
            if(!handler){
                handler = createHandler(tr, db_mgr, file);//创建handler， 同一js文件下的rpc函数， handler应该是同一个
                if(handler instanceof Error){
                    return handler;
                }
                map.set(file, handler);
            }
            registerRpcHandler(rpcServer, topic, false, handler); //向rpc服务中设置handler
        }
    })
    console.log("init mqtt ok");
}

const createHandler = (tr: Tr, mgr: Mgr, file: string): TopicHandler|Error => {
    let vmf = VMFactory.new(0, NativeObjsAuth.withNone());
    let dp = getDepend(depend, file + ".r.js").asSliceString();
    let codeItems = Vec.newTabKV();
    for(let i = 0; i < dp.length; i++){
        let bb = new BonBuffer();
        bb.writeUtf8(dp[i]);
        let item = tabkvNew("memory", "_$code", bb.getBuffer());
        codeItems.pushTabKV(item);
    }
    let codeResult = tr.query(codeItems, 1000, false);
    if(codeResult instanceof Error){
        return codeResult;
    }
    let codes = codeResult.asSliceTabKV();
    
    for(let i = 0; i < codes.length; i++){
        let v = tabkvGetValue(codes[i]);
        vmf = vmf.append(v);
    }
    

    return arcNewTopicHandler(TopicHandler.new(1000, vmf, cloneDbMgr(db_mgr)));
}