import React, { useEffect, useState } from 'react';
// Context Ethereum
import { useEth } from '../context/index';
// Components
import { MintNFT } from '../components/index';
// import Merkle
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
// import merkle from merkle.json
import whiteList from '../merkle/merkle.json';

const Mint = () => {
    const {
        state: { contract, accounts },
    } = useEth();

    const [owner, setOwner] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [maxSupply, setMaxSupply] = useState(null);
    const [maxPerAddress, setMaxPerAddress] = useState(null);
    const [saleStatus, setSaleStatus] = useState(null);
    const [price, setPrice] = useState(null);
    const [balanceOfAccount, setBalanceOfAccount] = useState(null);

    // Use effect
    useEffect(() => {
        // get owner
        const getOwner = async () => {
            if (accounts && contract) {
                const owner = await contract.methods.owner().call();
                setOwner(owner);
            }
        };
        // get current account
        const getCurrentAccount = async () => {
            if (accounts && contract) {
                const currentAccount = accounts[0];
                setCurrentAccount(currentAccount);
            }
        };
        // check if current account is owner
        const checkIsOwner = async () => {
            if (owner && currentAccount) {
                if (owner === currentAccount) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
        };
        // get TOTAL_SUPPLY
        const getTotalSupply = async () => {
            if (contract) {
                const totalSupply = await contract.methods
                    .TOTAL_SUPPLY()
                    .call();
                setMaxSupply(totalSupply);
            }
        };

        // get max per address
        const getMaxPerAddress = async () => {
            if (contract) {
                const maxPerAddress = await contract.methods
                    .MAX_NFTS_PER_ADDRESS()
                    .call();
                setMaxPerAddress(maxPerAddress);
            }
        };
        // get enum sale status
        const getSaleStatus = async () => {
            if (contract) {
                const saleStatus = await contract.methods.saleState().call();
                setSaleStatus(saleStatus);
            }
        };
        // get PRICE of each NFT
        const getPrice = async () => {
            if (contract) {
                const price = await contract.methods.PRICE().call();
                setPrice(price);
            }
        };

        // get balance of current account
        // const getBalanceOfAccount = async () => {
        //     if (contract) {
        //         const balanceOfAccount = await contract.methods.balanceOf(currentAccount).call();
        //         setBalanceOfAccount(balanceOfAccount);
        //     }
        // };
        
        getOwner();
        getCurrentAccount();
        checkIsOwner();
        getMaxPerAddress();
        getSaleStatus();
        getTotalSupply();
        getPrice();
        // getBalanceOfAccount();
    }, [contract, accounts, owner, currentAccount]);

    console.log('balanceOfAccount', balanceOfAccount);

    // Merkle
    let whitelist = [];
    whiteList.map((token) => {
        whitelist.push(token.address);
    });

    const leaves = whitelist.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const leaf = keccak256(currentAccount);
    const proof = tree.getHexProof(leaf);


    // mintPresale function
    const mintSale = async () => {
        if (contract) {
            try{
                return await contract.methods.mint_nft(proof).send({
                    from: currentAccount,
                    value: price,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            {saleStatus == 1 ? (
                <MintNFT price={price} mintSale={mintSale} />
            ) : (
                <h1>Sale not started</h1>
            )}
        </>
    );
};

export default Mint;
