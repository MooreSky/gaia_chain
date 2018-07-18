/**
 * see gendrust for more information
 */

#[path=../../util/]
use hash::{H160};

#[path=../../../bridge/vm/]
use biginteger::bigInt;


/**
 * Account
 */
struct AccountStruct {
    address: H160,   // address of account
    count: u64,      // count of transactions from the account
    balance: u64,    // current uGAIA of the account
}