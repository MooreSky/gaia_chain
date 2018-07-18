import {fill_bytes, Rand, create_rand} from "./rust/pi_serv/js_call";
let r = create_rand();
let v = fill_bytes(r, 64).as_slice_u8();
console.log(v);