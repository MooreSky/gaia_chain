import { generateAddress } from "../../../app/crypto/address"
import { keypair } from "../../../bridge/rust/pi_crypto/ed25519"
import { create_rand, fill_bytes } from "../../../bridge/rust/pi_serv/js_call"

export default (describe: any, it: any, chai: any) => {

    describe("app/crypto/address", () => {
        describe("generateAddress", () => {
            it("1", () => {
                let rand = create_rand();
                // seed is random number with 32Byte
                // FIXME: crash by next code
                let seed = fill_bytes(rand, 32);
                let [_, publicKey] = keypair(seed.as_slice_u8());
                let address = generateAddress(publicKey);
            });
        });
    });
}