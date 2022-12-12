// Unit Test for the contract
const WBC_NFT = artifacts.require('WBC_NFT');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const {
    BN,
    constants,
    expectEvent,
    expectRevert,
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const merkle = [
    {
        address: '0x24b1A56822B082B0Cf61bdb3B78445C3F23480cF',
    },
    {
        address: '0x12e694554c1A3e3699b68Da35b3AE81a90Cc1Aae',
    },
];
let whitelist = [];
merkle.map((token) => {
    whitelist.push(token.address);
});

const leaves = whitelist.map((address) => keccak256(address));
const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
const leaf = keccak256('0x24b1A56822B082B0Cf61bdb3B78445C3F23480cF');
const WrongLeaf = keccak256('0xA65342E5a81Cab20595A8e4F73758350056Ac5C1');
const merkleRoot = merkleTree.getHexRoot();
const proof = merkleTree.getHexProof(leaf);
const WrongProof = merkleTree.getHexProof(WrongLeaf);
console.log('proof', proof);

contract('WBC_NFT', function (accounts) {
    const [owner, user1, user2, user3, user4] = accounts;

    const member = '0x24b1A56822B082B0Cf61bdb3B78445C3F23480cF';

    describe('WBC_NFT', () => {
        beforeEach(async () => {
            Instance = await WBC_NFT.new(merkleRoot);
        });
        // should Revert if the sale is not started
        it('should revert if the sale is not started', async () => {
            await expectRevert(
                Instance.mint_nft(proof, {
                    from: member,
                    value: 1000000000000000000,
                }),
                'Sale has not started yet'
            );
        });
        // Test for the mint_nft function with invalid proof
        it('should not mint a token', async () => {
            await Instance.startSale({ from: owner });
            await expectRevert(
                Instance.mint_nft(WrongProof, { value: 1000000000000000000 }),
                'You are not whitelisted to buy this NFT'
            );
        });
        // Test for the mint_nft function with valid proof
        it('should mint a token', async () => {
            await Instance.startSale({ from: owner });
            const tx = await Instance.mint_nft(proof, {
                from: member,
                value: 1000000000000000000,
            });
            expectEvent(tx, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: member,
                tokenId: new BN(0),
            });
        });
        // it should be revert if we are not the owner
        it('start sale revert if we are not the owner', async () => {
            await expectRevert(
                Instance.startSale({ from: user1 }),
                'caller is not the owner'
            );
        });
        // it should be revert if we are not the owner
        it('end sale revert if we are not the owner', async () => {
            await expectRevert(
                Instance.endSale({ from: user1 }),
                'caller is not the owner'
            );
        });
        // it should be revert if value sent is less than 1 ether
        it('should revert if value sent is less that price', async () => {
            await Instance.startSale({ from: owner });
            await expectRevert(
                Instance.mint_nft(proof, {
                    from: member,
                }),
                'Not enough ETH sent'
            );
        });
    });
});
