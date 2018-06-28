
declare class Assert {
    equal(a: any, b: any);
    deepEqual(a: any, b: any);
}

declare class Chai {
    assert: Assert;
    should();
}

export const chai: Chai;