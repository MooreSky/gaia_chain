
/**
 * Block Header
 */

// ============================== import

import { BlockStruct } from "./struct/block_struct.s"

import { U64, newU64 } from "../util/bn"

// ============================== export

/**
 * max cash count, unit uGAIA
 */
export const MAX_UGAYA_COUNT: U64 = newU64(10).pow(newU64(18));

export class Block extends BlockStruct {
    
    constructor() {
        super();
    }
}