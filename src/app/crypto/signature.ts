
/**
 * signature wrap module
 */

// ============================== import

import { create_rand, fill_bytes } from "../../bridge/rust/pi_serv/js_call"
import * as ed25519 from "../../bridge/rust/pi_crypto/ed25519"
import { H256, H512 } from "../../bridge/rust/pi_math/hash"

// ============================== export

/**
 * generate secret-public key with random seed
 * @returns [H512, H256] [secret, public]
 */
const keypair = () => {

    const SEED_BYTES = 32;

    let rand = create_rand();
    // FIXME: fill_bytes crash
    let seed = fill_bytes(rand, SEED_BYTES);

    return ed25519.keypair(seed.as_slice_u8());
}

/**
 * generate secret-public key with seed
 * @returns [H512, H256] [secret, public]
 */
const keypairWithSeed = (seed: H256) => {
    return ed25519.keypair(seed.take());
}

const signature = (msgHash: H256, secretKey: H512) => {
    return ed25519.sign(msgHash.take(), secretKey.take());
}

const verify = (msgHash: H256, publicKey: H256, signature: H512) => {
    return ed25519.verify(msgHash.take(), publicKey.take(), signature.take());
}