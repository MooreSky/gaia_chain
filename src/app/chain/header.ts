
/**
 * Block Header
 */

// ============================== import

import { BlockHeaderStruct } from "./struct/header_struct.s"
import { U64, newU64 } from "../util/bn"

// ============================== export

const T = 10 * 1000;

export const BLOCK_VERSION = newU64(987654321);

export const MAX_INTERVAL_TIME = newU64(T);

export class BlockHeader extends BlockHeaderStruct {

    constructor() {
        super();
    }
}