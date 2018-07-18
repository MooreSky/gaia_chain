/**
 * see gendrust for more information
 */

#[path=../../util/]
use hash::{H160, H256, H512};

#[path=../]
use header::{BlockHeader};

#[path=../]
use transaction::{Transaction};

/**
 * block
 */
struct BlockStruct {
    header: BlockHeader,
    translations: [Transaction],
}