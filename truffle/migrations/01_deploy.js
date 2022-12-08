// import WBC_NFT from the compiled artifacts
const WBC_NFT = artifacts.require('WBC_NFT');
// import MerkleTree from merkletreejs
const {MerkleTree} = require('merkletreejs');
// import keccak256 from keccak256
const keccak256 = require('keccak256');
// import adress from whitelist/adress.json
const addresses = require('../whitelist/address.json');

let whitelist = [];
whitelist.map((address) => {
    whitelist.push(address.address)
});

const leaves = whitelist.map((address) => keccak256(address));
const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
const merkleRoot = merkleTree.getHexRoot();



module.exports = function (deployer) {
    deployer.deploy(WBC_NFT, merkleRoot);
    console.log('WBC_NFT deployed to:', WBC_NFT.address);
};
