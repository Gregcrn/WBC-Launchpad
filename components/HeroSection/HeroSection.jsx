import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import Style from './HeroSection.module.css';
import { Button } from '../index';
import images from '../../img';
import { SiEthereum } from 'react-icons/si';
import { shortenAddress } from '../../utils/shortenAddress';
import Link from 'next/link';

// Merkle
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import merkle from '../../merkle/merkle.json';

const HeroSection = ({ currentAccount }) => {
    let whitelist = [];
    merkle.map((token) => {
        whitelist.push(token.address);
    });

    const leaves = whitelist.map((address) => keccak256(address));
    const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
    const leaf = keccak256(currentAccount);
    const proof = merkleTree.getHexProof(leaf);

    const isWhitelisted = merkleTree.verify(proof, leaf, merkleTree.getRoot());
    console.log('isWhitelisted', isWhitelisted);

    const titleData = 'WBC Launchpad';
    const router = useRouter();
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1 style={{ margin: 0 }}>{titleData}🍷</h1>
                    <p>
                        NFT collections, Vineyard tokenization, Metaverse drops,
                        Play to earn, oenotourism, tokenization projects, DAO /
                        ICO, IPO...
                    </p>
                    {isWhitelisted && (
                        <Button
                            btnName="Mint your NFT"
                            handleClick={() => router.push('/mint')}
                        />
                    )}
                    <div className={Style.panel}>
                        <div className={Style.cardFront}>
                            <SiEthereum className={Style.cardIcon} />
                            {currentAccount && (
                                <div className={Style.cardNumber}>
                                    {shortenAddress(currentAccount)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image
                        src={images.hero}
                        alt="Hero section"
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
