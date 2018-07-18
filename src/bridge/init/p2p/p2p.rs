#[path=../../]
use vm::biginteger::bigInt;

#[constructor=true,hasmgr=false]
struct P2PCfg{
    addr: String,
    con: String,
    peer_list: &[(String, u32)],
}