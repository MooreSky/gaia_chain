import { chai } from "./framework/chai";
import { mocha } from "./framework/mocha";

declare const it, describe;

mocha.setup('bdd');
let should = chai.should();

const add = (a: number, b: number) => a + b;

describe("test add function", () => {
    it("1 add 1 expect 2", () => {
        var sum = add(1, 2);
        should.equal(sum, 3);
    });

    it("1 add 2 expect 3", () => {
        var sum = add(1, 2);
        should.equal(sum, 3);
    });
});

mocha.run();