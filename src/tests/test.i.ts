
import { mocha } from "./framework/mocha";

import address from "./app/crypto/address"

declare const it, describe;

let testArray = [address];

mocha.setup('bdd');

for (let test of testArray) {
    test(describe, it);
}

mocha.run();