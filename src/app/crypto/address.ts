import { keccak256 } from "../../bridge/rust/pi_crypto/hash"
import { H160, H256 } from "../../bridge/rust/pi_math/hash"

export const generateAddress = (publicKey: H256) => {
    let hash = keccak256(publicKey.take());
    let buf = hash.take();
    let arr = new Uint8Array(buf.buffer, buf.length - 20, 20);
    return new H160(buf);
}