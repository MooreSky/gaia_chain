/**
 * see gendrust for more information
 */

#[path=../../util/]
use hash::{H160, H256, H512};

#[path=../../../bridge/vm/]
use biginteger::bigInt;

/**
 * block header
 */
struct BlockHeaderStruct {
    parentHash: H256,

    version: u32,
    timpstamp: u64,

    forgerAddr: H160,
    forgerSign: H512,

    blsRandom: H256,
    blsPubkey: H256,

    txMerkleRoot: H256,
    index: u64, 

    totalWeight: f64,
    groupNumber: u32,
    headerHash: H256,
}
