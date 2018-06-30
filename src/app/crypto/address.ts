
/**
 * address
 */

// ============================== import

import { H160, H256, hash } from "./hash"

// ============================== export

export const generateAddress = (publicKey: H256) => {
    // H160 is 20Bytes
    const ADDRESS_BYTES = 20;

    let hashArray = hash(publicKey.take()).take();
    let arr = new Uint8Array(hashArray.buffer, hashArray.length - ADDRESS_BYTES, ADDRESS_BYTES);
    
    // TODO: Convert Uint8Array to H160
    return new H160(hashArray);
}