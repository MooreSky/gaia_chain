import {chai} from "./chai";
import {mocha} from "./mocha";

mocha.setup('bdd');
var should = chai.should();
function add(a, b)
{
    return a + b;
}
describe("测试add函数", function()
{
    console.log("2222222222222222222222222222222222222222222");
	it("1加1等于2", function()
    {
        var sum = add(1, 2);
        should.equal(sum, 3);
    });

    it("1加2等于3", function()
    {
        var sum = add(1, 2);
        should.equal(sum, 3);
    });
});

mocha.run();
console.log("2222222222222222222222222222222222222222222");
