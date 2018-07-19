/*
 * cpos
 */

// ============================== import 

import { Forger } from "./forger"
import { Transaction } from "../chain/transaction"
import { BlockHeader } from "../chain/header"
import { Heap } from "../../pi/util/heap"
import { BonBuffer } from "../../pi/util/bon";
import { H160 } from "../util/hash";
import { U64, newU64 } from "../util/bn";

// ============================== export

export const MIN_ADD_HEIGHT = newU64(40000);

export const MIN_EXIT_HEIGHT = newU64(400000);

// export class ForgeGroup {
//     members: Heap<Forger>; // forger's group

//     constructor() {

//         // NOTE: Heap is min-heap
//         let cmp = (a: Forger, b: Forger) => {
//             if (a.totalWeight === b.totalWeight) {
//                 return b.address.cmp(a.address);
//             }
//             return b.totalWeight > a.totalWeight ? 1 : -1;
//         }

//         this.members = new Heap(cmp);
//     }
// }

// export class ForgeCommittee {
//     groups: ForgeGroup[];     // groups' array
//     addWaits: Heap<Forger>;   // wait for forge
//     exitWaits: Heap<Forger>;  // wait for exit

//     constructor() {
//         this.groups = [];

//         // NOTE: Heap is min-heap
//         let cmp = (a: Forger, b: Forger) => a.addBlockHeight.cmp(b.addBlockHeight);
//         this.addWaits = new Heap<Forger>(cmp);

//         cmp = (a: Forger, b: Forger) => a.exitBlockHeight.cmp(b.exitBlockHeight);
//         this.exitWaits = new Heap<Forger>(cmp);
//     }

//     add(height: U64, tx: Transaction) {
//         let forger = new Forger(tx.from, tx.value, tx.blsPubKey, height);
//         this.addWaits.insert(forger);
//     }

//     exit(height: U64, address: H160) {
//         let group: ForgeGroup;
//         let forger: Forger;
//         for (let g of this.groups) {
//             let members = g.members.getImpl();
//             for (let i = 0; i < members.length; ++i) {
//                 if (members[i].address.eq(address)) {
//                     group = g;
//                     forger = members[i];
//                     break;
//                 }
//             }
//         }

//         if (group !== undefined) {
//             this.exitWaits.insert(forger);
//             group.members.remove(forger);
//         }
//     }

//     update(header: BlockHeader) {
//         this.addForgerToBlock(header);
//         this.updateForger(header);
//     }

//     forge(parentHeader: BlockHeader) {

//     }

//     private addForgerToBlock(header: BlockHeader) {
//         let addHeight = header.height.sub(MIN_ADD_HEIGHT);
//         let forger: Forger;
//         while (forger = this.addWaits.pop()) {
//             if (forger.addBlockHeight.lte(addHeight)) {
//                 let id = forger.address.mod(new BN(256, 10, "le")).mod.toNumber();
//                 this.groups[id].members.insert(forger);
//                 forger.computeInitWeight(header.height, header.blsRandom);
//             } else {
//                 this.addWaits.insert(forger);
//                 break;
//             }
//         }
//     }

//     private updateForger(header: BlockHeader) {
//         let id = header.groupNumber.toNumber();
//         let members = this.groups[id].members;
//         if (!members.getImpl().find(item => item.address.eq(header.forgeAddr))) {
//             return false;
//         }

//         let forger: Forger;
//         while (forger = members.pop()) {
//             let buf = new BonBuffer();
//             buf.writeBin(forger.address.toBuffer("le"));
//             buf.writeBin(header.height.toBuffer("le"));
//             buf.writeBin(header.headerHash.toBuffer("le"));

//             let u8Arr = buf.getBuffer();
//             let h = hash256(new Buffer(u8Arr));
//             let id = h[h.length - 1];
//             this.groups[id].members.insert(forger);
//             forger.computeInitWeight(header.height, header.blsRandom);

//             if (forger.address.eq(header.forgeAddr)) {
//                 break;
//             }
//         }

//         return true;
//     }
// }