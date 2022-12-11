import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AiFillFire, AiFillHeart } from 'react-icons/ai';
import { MdVerified, MdTimer, MdWineBar } from 'react-icons/md';
import { FaWineBottle } from 'react-icons/fa';
//INTERNAL IMPORT
import Style from './MintNFT.module.css';
import images from '../../img';
import Button from '../Button/Button';
// utils
import { weiToEth } from '../../utils/weiToEth';

const MintNFT = ({
    price,
    mintSale,
    balanceOfAccount,
    maxPerAddress,
    saleStatus,
    totalSupply,
}) => {
    return (
        <>
            <div className={Style.bigNFTSlider}>
                <div className={Style.bigNFTSlider_box}>
                    <div className={Style.bigNFTSlider_box_left}>
                        <h2></h2>
                        <div className={Style.bigNFTSlider_box_left_creator}>
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_creator_profile
                                }
                            >
                                <Image
                                    className={
                                        Style.bigNFTSlider_box_left_creator_profile_img
                                    }
                                    src={images.user1}
                                    alt="profile image"
                                    width={50}
                                    height={50}
                                />
                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_creator_profile_info
                                    }
                                >
                                    <p>Creator</p>
                                    <h4>
                                        <span>
                                            <MdVerified />
                                        </span>
                                    </h4>
                                </div>
                            </div>

                            <div
                                className={
                                    Style.bigNFTSlider_box_left_creator_collection
                                }
                            >
                                <AiFillFire
                                    className={
                                        Style.bigNFTSlider_box_left_creator_collection_icon
                                    }
                                />

                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_creator_collection_info
                                    }
                                >
                                    <p>Collection</p>
                                    <h4>Jurade</h4>
                                </div>
                            </div>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_bidding}>
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box
                                }
                            >
                                <small>Current Price</small>
                                <p>
                                    {price && (
                                        <span>{weiToEth(`${price}`)} ETH</span>
                                    )}
                                </p>
                            </div>

                            <p
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_auction
                                }
                            >
                                <MdTimer
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_icon
                                    }
                                />
                                <span>Auction ending in</span>
                            </p>

                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_timer
                                }
                            >
                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_timer_item
                                    }
                                >
                                    <p>0</p>
                                    <span>Days</span>
                                </div>

                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_timer_item
                                    }
                                >
                                    <p>{saleStatus == 2 ? 0 : 3}</p>
                                    <span>Hours</span>
                                </div>

                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_timer_item
                                    }
                                >
                                    <p>{saleStatus == 2 ? 0 : 21}</p>
                                    <span>mins</span>
                                </div>

                                <div
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_timer_item
                                    }
                                >
                                    <p> {saleStatus == 2 ? 0 : 10}</p>
                                    <span>secs</span>
                                </div>
                            </div>

                            <div className={Style.bigNFTSlider_box_left_button}>
                                {balanceOfAccount != maxPerAddress && (
                                    <Button
                                        btnName="Mint your NFT"
                                        handleClick={mintSale}
                                    />
                                )}
                            </div>
                            <p
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_auction
                                }
                            >
                                <MdWineBar
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_icon
                                    }
                                />
                                <span>
                                    Number of NFT owned : {balanceOfAccount} /{' '}
                                    {maxPerAddress} NFT
                                </span>
                            </p>
                            <p
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_auction
                                }
                            >
                                <FaWineBottle
                                    className={
                                        Style.bigNFTSlider_box_left_bidding_box_icon
                                    }
                                />
                                <span>Total of supply : {totalSupply}</span>
                            </p>
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_right}>
                        <div className={Style.bigNFTSlider_box_right_box}>
                            <Image
                                src={images.nft1}
                                alt="NFT IMAGE"
                                width={700}
                                height={700}
                                className={Style.bigNFTSlider_box_right_box_img}
                            />

                            <div
                                className={
                                    Style.bigNFTSlider_box_right_box_like
                                }
                            >
                                <AiFillHeart />
                                <span>like</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MintNFT;
