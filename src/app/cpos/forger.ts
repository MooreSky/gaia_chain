
/**
 * Forger
 */

// ============================== import

import { ForgerStruct } from "./struct/forger_struct.s"
import { newU64 } from "../util/bn"

// ============================== export

export const MIN_ADD_FORGE_HEIGHT = newU64(40000);

export const MIN_EXIT_FORGE_HEIGHT = newU64(400000);

export class Forger extends ForgerStruct {
}