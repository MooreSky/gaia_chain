# directory

* util
   + bn.ts -- Big Integer
   + hash.ts -- Common Hash: H32, H48, H160, H256, H512, H520
   + database.ts -- wrap of database
* crypto 
   + hash.ts -- keccak256
   + address.ts -- generate address 
   + signature.ts -- signature
* chain
   + header.ts -- block header
   + transaction.ts
   + merkle.ts -- merkle root
   + block.ts -- block
* storage
   + chaindb.ts -- blockchain database
* cpos: POS of GAIA
   + forger.ts
   + committee.ts
* sync
