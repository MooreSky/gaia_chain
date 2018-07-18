/**
 * see gendrust for more information
 */

#[path=../../util/]
use hash::{H160, H256, H512};

#[path=../../../bridge/vm/]
use biginteger::bigInt;

/**
 * transction
 */
struct TransactionStruct {
    nonce: u64,      // tx's count of tx send from
    fee: u64,        // transaction fee for Forger, unit in yGAIA
    from: H160,      // address of tx send from
    to: H160,        // address of tx send to
    value: u64,      // fee for tx's send to, unit in yGIAI
    
    sign: H512,      // from's signature; no use for hash
    
    txType: u8,        // type, value is in "Default = 0, AddForge = 1, RemoveForge = 2"
    blsPubKey: H256, // the blsPubKey is valid only when type is AddForge

    // use for index

    txHash: H256,   // hash for above data except sign field
}