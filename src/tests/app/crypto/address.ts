import { generateAddress } from "../../../app/crypto/address"
import { keypair } from "../../../app/crypto/signature"

export default (describe: any, it: any, chai: any) => {

    describe("app/crypto/address", () => {
        describe("generateAddress", () => {
            it("1", () => {
                let [_, publicKey] = keypair();
                let address = generateAddress(publicKey);
            });
        });
    });
}