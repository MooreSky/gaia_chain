
/**
 * see gendrust for more information
 */ 

#[path=../util/]
use hash::{H160, H256, H520};

#[path=../util/]
use bn::{U32, U64};

/**
 * block header
 */
struct BlockHeaderStruct {
    
    parentHash: H256,

    version: U32,
    timpstamp: U64,

    forgerAddr: H160,
    forgerSign: H512,
    
    blsRandom: H256,
    blsPubkey: H256,

    txMerkleRoot: H256,
    index: U64,

    totalWeight: number,
    groupNumber: U32,
    headerHash: H256,
}