import { generateAddress } from "../../../app/crypto/address"
import { keypair } from "../../../app/crypto/signature"

import { chai } from "../../framework/chai";

export default (describe: any, it: any) => {

    describe("app/crypto/address", () => {
        describe("generateAddress", () => {
            it("1", () => {
                let [_, publicKey] = keypair();
                let address = generateAddress(publicKey);
                chai.assert.equal(address.take().length, 20);
            });
        });
    });
}