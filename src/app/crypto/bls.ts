
/**
 * signature wrap module
 */

// ============================== import

import { H256, H512 } from "../util/hash"

// ============================== export

export const signature = (msgHash: H256, secretKey: H256) => {
    return H512.from_buf(new Uint8Array(0));
}

export const verify = (msgHash: H256, publicKey: H256, signature: H512) => {
    return false;
}

