
/**
 * merkle tree
 */

// ============================== import

import { H256 } from "../util/hash"
import { keccak256 } from "../crypto/hash"

// ============================== export

/**
 * @description compute root of merkle tree
 */
export const merkleRoot = (hashes: H256[]) => {
	
	if (hashes.length === 1) {
		return hashes[0];
	}

	let branches = [] as H256[];
	
	let i = 0;
	while (i + 1 < hashes.length) {
		branches.push(merkleHash(hashes[i], hashes[i + 1]));
		i += 2;
	}

	// if length is odd, compute self for last element
	if (hashes.length % 2 === 1) {
		let last = hashes[hashes.length - 1];
		branches.push(merkleHash(last, last));
	}

	return merkleRoot(branches);
}

// ============================== implement


const merkleHash = (left: H256, right: H256) => {
	
	const H512_BYTES = 64;
	const H256_BYTES = 64;

	let result = new Uint8Array(H512_BYTES);
	result.set(left.take(), 0);
	result.set(right.take(), H256_BYTES);

	return keccak256(result);
}