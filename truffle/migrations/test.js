const merkle = require('../whitelist/remix.json');
const { MerkleTree } = require('merkletreejs');
// import keccak256 from keccak256
const keccak256 = require('keccak256');

let whitelist = [];
merkle.map((token) => {
    whitelist.push(token.address);
});

const leaves = whitelist.map((address) => keccak256(address));
const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
const leaf = keccak256('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2');
const proof = merkleTree.getHexProof(leaf);

console.log('proof', proof);

// "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54"
