import {p2pManageNew, sleep} from "../../rust/pi_serv/js_call";
import {cfgMgr} from "../../../pi/util/cfg";
import {P2PCfg} from "./p2p.s";
import {Vec} from "../../rust/def/vec";

//初始化p2p服务
export const init = () => {
    console.log("init p2p start");
    let cfg = cfgMgr.get("_$p2p_server_cfg").get(0) as P2PCfg;
    let cfg2 = cfgMgr.get("_$p2p_server_cfg").get(1) as P2PCfg;
    let arr1 = Vec.newString();
    let arr2 = Vec.newU32();
    for(let i = 0; i < cfg.peer_list.length; i++){
        let [s, t] = cfg.peer_list[i];
        arr1.pushString(s);
        arr2.pushU32(t);
    }
    let P2P = p2pManageNew(cfg.addr, arr1, arr2);
    sleep(10);
    P2P.connectAddr(cfg2.addr);
    P2P.connect();
    P2P.broadcastAddr();
    console.log("init p2p ok");
}