
/**
 * signature wrap module
 */

// ============================== import

import { H256, H512 } from "../util/hash"

import * as ed25519 from "../../bridge/rust/pi_crypto/ed25519"
import { create_rand, fill_bytes } from "../../bridge/rust/pi_serv/js_call"

// ============================== export

/**
 * generate secret-public key with random seed
 * @returns [H512, H256] [secret, public]
 */
export const keypair = () => {

    const SEED_BYTES = 32;

    let rand = create_rand();
    let seed = fill_bytes(rand, SEED_BYTES);

    return ed25519.keypair(seed.as_slice_u8());
}

/**
 * generate secret-public key with seed
 * @returns [H512, H256] [secret, public]
 */
export const keypairWithSeed = (seed: H256) => {
    return ed25519.keypair(seed.take());
}

export const signature = (msgHash: H256, secretKey: H512) => {
    return ed25519.sign(msgHash.take(), secretKey.take());
}

export const verify = (msgHash: H256, publicKey: H256, signature: H512) => {
    return ed25519.verify(msgHash.take(), publicKey.take(), signature.take());
}