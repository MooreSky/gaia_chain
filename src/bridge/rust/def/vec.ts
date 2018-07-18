
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
import {TabKV} from "../pi_db/db"
export class Vec extends NObject{
    static _$info = new SInfo("Vec", 4144079164 , new Map(), []);    
    
    static newU8 = (): Vec => {     
        let result = call(278583573,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityU8 = (capacity:number): Vec => {          
        let result = call(605387716,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    capacity = (): number => {     
        return call(3865263801,[ this.self ]); 
    }    
    
    asSliceU8 = (): Uint8Array => {     
        let result = call(2115662480,[ this.self ]);     
        return result; 
    }    
    
    swapRemoveU8 = (index:number): number => {          
        return call(645064753,[ this.self,index ]); 
    }    
    
    insertU8 = (index:number,element:number) => {               
        call(3352453288,[ this.self,index,element ]);
    }    
    
    removeU8 = (index:number): number => {          
        return call(2151809700,[ this.self,index ]); 
    }    
    
    pushU8 = (value:number) => {          
        call(107439253,[ this.self,value ]);
    }    
    
    popU8 = (): number => {     
        let result = call(2913114375,[ this.self ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    
    clear = () => {     
        call(4154086477,[ this.self ]);
    }    
    
    len = (): number => {     
        return call(1534577376,[ this.self ]); 
    }    
    
    static newTabKV = (): Vec => {     
        let result = call(3787109479,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityTabKV = (capacity:number): Vec => {          
        let result = call(3760459365,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    asSliceTabKV = (): Array<TabKV> => {     
        let result = call(580562131,[ this.self ]);     
        for(let i = 0; i < result.length; i++){         
                (<any>result[i]) = new TabKV(result[i]);
                
        }
        
        return result; 
    }    
    
    swapRemoveTabKV = (index:number): TabKV => {          
        let result = call(3697063043,[ this.self,index ]);     
        (<any>result) = new TabKV(result);
        
        return result; 
    }    
    
    insertTabKV = (index:number,element:TabKV) => {               
        (<any>element) = element.self;
        
        call(952027254,[ this.self,index,element ]);
    }    
    
    removeTabKV = (index:number): TabKV => {          
        let result = call(482264970,[ this.self,index ]);     
        (<any>result) = new TabKV(result);
        
        return result; 
    }    
    
    pushTabKV = (value:TabKV) => {          
        (<any>value) = value.self;
        
        call(393347340,[ this.self,value ]);
    }    
    
    popTabKV = (): TabKV => {     
        let result = call(3897029640,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new TabKV(result);
                
        }
        
        return result; 
    }    
    
    static newI64 = (): Vec => {     
        let result = call(1982375693,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityI64 = (capacity:number): Vec => {          
        let result = call(3601066191,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    asSliceI64 = (): Array<number> => {     
        let result = call(1239372537,[ this.self ]);     
        return result; 
    }    
    
    swapRemoveI64 = (index:number): number => {          
        return call(859758326,[ this.self,index ]); 
    }    
    
    insertI64 = (index:number,element:number) => {               
        call(498200772,[ this.self,index,element ]);
    }    
    
    removeI64 = (index:number): number => {          
        return call(2071154981,[ this.self,index ]); 
    }    
    
    pushI64 = (value:number) => {          
        call(2957693395,[ this.self,value ]);
    }    
    
    popI64 = (): number => {     
        let result = call(802425326,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = bigInt(result);
                
        }
        
        return result; 
    }    
    
    static newString = (): Vec => {     
        let result = call(2399706024,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityString = (capacity:number): Vec => {          
        let result = call(3498998071,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    asSliceString = (): Array<string> => {     
        let result = call(3093995464,[ this.self ]);     
        return result; 
    }    
    
    swapRemoveString = (index:number): string => {          
        return call(3156648318,[ this.self,index ]); 
    }    
    
    insertString = (index:number,element:string) => {               
        call(1978728938,[ this.self,index,element ]);
    }    
    
    removeString = (index:number): string => {          
        return call(1210159287,[ this.self,index ]); 
    }    
    
    pushString = (value:string) => {          
        call(3803919743,[ this.self,value ]);
    }    
    
    popString = (): string => {     
        let result = call(3830052262,[ this.self ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    
    static newArc = (): Vec => {     
        let result = call(1828679694,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityArc = (capacity:number): Vec => {          
        let result = call(2496158841,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    asSliceArc = (): Array<Vec> => {     
        let result = call(2606142630,[ this.self ]);     
        for(let i = 0; i < result.length; i++){         
                (<any>result[i]) = new Vec(result[i]);
                
        }
        
        return result; 
    }    
    
    swapRemoveArc = (index:number): Vec => {          
        let result = call(12783470,[ this.self,index ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    insertArc = (index:number,element:Vec) => {               
        (<any>element) = element.self;
        
        call(1981878306,[ this.self,index,element ]);
    }    
    
    removeArc = (index:number): Vec => {          
        let result = call(3566885191,[ this.self,index ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    pushArc = (value:Vec) => {          
        (<any>value) = value.self;
        
        call(1441496172,[ this.self,value ]);
    }    
    
    popArc = (): Vec => {     
        let result = call(2704292785,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    
    static newU32 = (): Vec => {     
        let result = call(1708919049,[  ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    static withCapacityU32 = (capacity:number): Vec => {          
        let result = call(1994007224,[ capacity ]);     
        (<any>result) = new Vec(result);
        
        return result; 
    }    
    
    asSliceU32 = (): Array<number> => {     
        let result = call(2842251538,[ this.self ]);     
        return result; 
    }    
    
    swapRemoveU32 = (index:number): number => {          
        return call(1587209337,[ this.self,index ]); 
    }    
    
    insertU32 = (index:number,element:number) => {               
        call(3744706321,[ this.self,index,element ]);
    }    
    
    removeU32 = (index:number): number => {          
        return call(2103362090,[ this.self,index ]); 
    }    
    
    pushU32 = (value:number) => {          
        call(1420742667,[ this.self,value ]);
    }    
    
    popU32 = (): number => {     
        let result = call(3987113084,[ this.self ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }
}