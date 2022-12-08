import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

//INTERNAL IMPORT
import Style from './HeroSection.module.css'
import { Button } from '../index'
import images from '../../img'
import { SiEthereum } from 'react-icons/si'
import { shortenAddress } from '../../utils/shortenAddress';



const HeroSection = ({ currentAccount }) => {
  const titleData = 'WBC Launchpad'
  const router = useRouter()
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData}🚀</h1>
          <p>
            NFT collections, Vineyard tokenization, Metaverse drops, Play to
            earn, oenotourism, tokenization projects, DAO / ICO, IPO...
          </p>
          <Button
            btnName='Register on the WhiteList'
            handleClick={() => router.push('/mint')}
          />
          <div className={Style.panel}>
            <div className={Style.cardFront}>
              <SiEthereum className={Style.cardIcon} />
              {currentAccount && <div className={Style.cardNumber}>{shortenAddress(currentAccount)}</div>}
            </div>
          </div>
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt='Hero section'
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
