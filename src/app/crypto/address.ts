
/**
 * address
 */

// ============================== import

import { H160, H256 } from "../util/hash"
import { keccak256 } from "./hash"

// ============================== export

export const generateAddress = (publicKey: H256) => {
    // H160 is 20Bytes
    const ADDRESS_BYTES = 20;

    let buf = keccak256(publicKey.take()).take();
    let arr = new Uint8Array(buf.buffer, buf.length - ADDRESS_BYTES, ADDRESS_BYTES);
    
    return H160.from_buf(buf);
}