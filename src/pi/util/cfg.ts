import {baseType} from "../lang/type";
import {Struct} from "../struct/struct_mgr";
export class Cfg{
    map: Map<string, Map<baseType, Struct>> = new Map<string, Map<baseType, Struct>>();
    set(key: string, value: Map<baseType, Struct>){
        this.map.set(key, value);
        let annotate = (<any>value.get(0).constructor)._$info.annotate;
        if(annotate && annotate.primary){
            let primarys = annotate.primary.split("-");
            for(let i = 0; i < primarys.length; i++){
                let primaryMap = new Map<baseType, Struct>();
                value.forEach((v, k) => {
                    primaryMap.set(v[primarys[i]], v);
                });
                this.map.set(`${key}#${primarys[i]}`, primaryMap);
            }
        }
    }

    get(key: string): Map<baseType, Struct>{
        return this.map.get(key);
    }
}

export const cfgMgr = new Cfg();
