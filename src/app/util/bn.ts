
/**
 * Big Integer
 */

// ============================== import

import * as bigInt from "../../bridge/vm/biginteger"

// ============================== export

export type U32 = number;

export type U64 = bigInt.BigInteger;

export type U128 = bigInt.BigInteger;

export const newU64 = (num: number) => bigInt(num);

export const newU128 = (num: number) => bigInt(num);

export const newBigInteger = (num: number) => bigInt(num);