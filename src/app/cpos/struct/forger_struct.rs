/**
 * see gendrust for more information
 */

#[path=../../util/]
use hash::{H160, H256}

#[path=../../../bridge/vm/]
use biginteger::bigInt;

/**
 * Forger
 */
struct ForgerStruct {
    address: H160,            // forger's address
    deposit: u64,             // unit in yGAIA
    blsPubKey: H256,          // public key with bls random
    groupNumber: u32,         // current group
    
    initWeight:  f64,         // init forge weight
    accWeight:   f64,         // acculate weight, up to 10 times initWeight
    rankWeight:  f64,         // rank weight
    totalWeight: f64,         // totalWeight = rankWeight + accWeight

    lastBlockHeight: u64,     // block index of lastest group 

    addBlockHeight: u64,      // block height when forger add committee
    removeBlockHeight: u64,   // block height when forger exit committee
}