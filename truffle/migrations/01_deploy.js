// Deploy WBC_NFT contract
const WBC_NFT = artifacts.require("WBC_NFT");
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');


const tokens = [
    {
        "address": "0xcFc409c6FC65467d34Da7700600794aA6cC8a5E1"
    },
    {
        "address": "0x1e02548Cc1148e1f61174ff7dDD66F9bd202559B"
    }
]

const leaves = tokens.map(token => keccak256(token.address));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getHexRoot();
console.log("Merkle root:", root);



module.exports = async function (deployer) {
    await deployer.deploy(WBC_NFT);
    const wbcNFT = await WBC_NFT.deployed();
    console.log("WBC_NFT deployed to:", wbcNFT.address);
    }