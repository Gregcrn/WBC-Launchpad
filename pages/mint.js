import React, { useEffect, useState } from 'react';
// Context Ethereum
import { useEth } from '../context/index';
// Components
import {
    AdminInterface,
    AlertWrongNetwork,
    Button,
    Loader,
    MintNFT,
} from '../components/index';
// import Merkle
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
// import merkle from merkle.json
import merkle from '../merkle/merkle.json';
import Link from 'next/link';
// Success Toast
import toast, { Toaster } from 'react-hot-toast';

const Mint = () => {
    const { state } = useEth();
    const {
        state: { contract, accounts },
    } = useEth();

    const [owner, setOwner] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [maxPerAddress, setMaxPerAddress] = useState(null);
    const [saleStatus, setSaleStatus] = useState(null);
    const [price, setPrice] = useState(null);
    const [balanceOfAccount, setBalanceOfAccount] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);
    const [sucessMint, setSucessMint] = useState(false);

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
        const getBalanceOfAccount = async () => {
            if ((contract, currentAccount)) {
                const balanceOfAccount = await contract.methods
                    .balanceOf(currentAccount)
                    .call();
                setBalanceOfAccount(balanceOfAccount);
            }
        };
        // get Total of Supply
        const getTotalSupply = async () => {
            if (contract) {
                const totalSupply = await contract.methods.MAX_SUPPLY().call();
                setTotalSupply(totalSupply);
            }
        };
        getOwner();
        getCurrentAccount();
        checkIsOwner();
        getMaxPerAddress();
        getSaleStatus();
        getPrice();
        getBalanceOfAccount();
        getTotalSupply();
    }, [contract, accounts, owner, currentAccount]);

    // Merkle
    let whitelist = [];
    merkle.map((token) => {
        whitelist.push(token.address);
    });

    const leaves = whitelist.map((address) => keccak256(address));
    const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
    const leaf = keccak256(currentAccount);
    const proof = merkleTree.getHexProof(leaf);
    // "0x8672be2c3c90d8bf0f59d6cee7b7cf33a4914befb4bee658f11f9b9923f58582"
    // mintPresale function
    const mintSale = async () => {
        if (contract) {
            try {
                return await contract.methods.mint_nft(proof).send({
                    from: currentAccount,
                    value: price,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
    // function to end sale from owner
    const endSale = async () => {
        if (contract) {
            try {
                return await contract.methods.endSale().send({
                    from: owner,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Function to send Royalties
    const sendRoyalties = async () => {
        if (contract) {
            try {
                console.log('sendRoyalties');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            {!state.artifact ? (
                <Loader />
            ) : !state.contract ? (
                <AlertWrongNetwork />
            ) : // check if current account is owner
            isOwner ? (
                <AdminInterface
                    saleStatus={saleStatus}
                    endSale={endSale}
                    sendRoyalties={sendRoyalties}
                />
            ) : saleStatus == 1 ? (
                <>
                    <MintNFT
                        price={price}
                        mintSale={mintSale}
                        balanceOfAccount={balanceOfAccount}
                        maxPerAddress={maxPerAddress}
                        totalSupply={totalSupply}
                        success={sucessMint}
                    />
                </>
            ) : saleStatus == 2 ? (
                <>
                    <h1
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textTransform: 'uppercase',
                        }}
                    >
                        Sale are already end
                    </h1>
                    {!isOwner && (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '2rem',
                                }}
                            >
                                <Link href="/collection">
                                    <Button btnName="Discover my collection" />
                                </Link>
                                <Link
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    href="https://testnets.opensea.io/"
                                >
                                    <Button btnName="See on OpenSea" />
                                </Link>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h1
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textTransform: 'uppercase',
                        }}
                    >
                        Sale are not started yet
                    </h1>
                </>
            )}
        </>
    );
};

export default Mint;
