import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AiFillFire, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { MdVerified, MdTimer } from 'react-icons/md'
import { TbArrowBigLeftLines, TbArrowBigRightLine } from 'react-icons/tb'

//INTERNAL IMPORT
import Style from './BigNFTSilder.module.css'
import images from '../../img'
import Button from '../Button/Button'

const BigNFTSilder = () => {
  const [idNumber, setIdNumber] = useState(0)

  const sliderData = [
    {
      title: 'New Age Symphony',
      id: 1,
      name: 'Daulat Hussain',
      collection: 'Saint-Emilion bitcoin',
      price: '00664 ETH',
      like: 243,
      image: images.user1,
      nftImage:
        'https://i.seadn.io/gae/pn2jfYDoAKoeilhiUZwHmsCa3GPj7Tz8DfSxmFHhP0gZiXSAxb-lHEpB92TVcp_SyGUcW5ve6QFeC4IVKRakIu7tEoKiPgPt40r99w?auto=format&w=1000',
      time: {
        days: 21,
        hours: 40,
        minutes: 81,
        seconds: 15,
      },
    },
    {
      title: 'Pink Candy',
      id: 2,
      name: 'Shoaib Hussain',
      collection: 'Margaux Bitcoin La Cuvée',
      price: '0000004 ETH',
      like: 243,
      image: images.user1,
      nftImage:
        'https://i.seadn.io/gae/INCeRPeSI1f4LWYC2LZszkFhrCjla8ReVfh7MSAz8k8wH3dLse0ObMhahTLpqKbAUk9LWgxYlrh09Je6Y3uNY-0hOyir9dmTnkh-?auto=format&w=1000',
      time: {
        days: 77,
        hours: 11,
        minutes: 21,
        seconds: 45,
      },
    },
    {
      title: 'Pinotage',
      id: 3,
      name: 'Raayan Hussain',
      collection: 'Pessac-Leognan',
      price: '0000064 ETH',
      like: 243,
      image: images.user1,
      nftImage:
        'https://i.seadn.io/gae/e2-dSR9TlgbXy1dAUQVOEwfy6BHI5dWuntA_CCGmX2PdIsBqcSMwJSD-SKmi2_q_9hGjmK1oX2ORsCMkHRReDjWwFTUArhFH3y_sFA?auto=format&w=384',
      time: {
        days: 37,
        hours: 20,
        minutes: 11,
        seconds: 55,
      },
    },
    {
      title: 'Copper Finance',
      id: 4,
      name: 'Raayan Hussain',
      collection: 'Saint-Émilion Grand Cru',
      price: '4664 ETH',
      like: 243,
      image: images.user1,
      nftImage:
        'https://i.seadn.io/gae/tRdCKdZvjVRCcFDRlkGMQo2xCAwzqY2VZUY54qysL9oTtT7_D5QlTnvOQWutijxo5jVytA4DmL9DaDL_ezaxLduRuKBrRuKadcUBdlM?auto=format&w=384',
      time: {
        days: 87,
        hours: 29,
        minutes: 10,
        seconds: 15,
      },
    },
  ]

  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1)
    }
  }, [idNumber, sliderData.length])

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1)
    }
  }, [idNumber])

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt='profile image'
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{' '}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>mins</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button
                btnName='Place'
                handleClick={() => {}}
              />
              <Button
                btnName='View'
                handleClick={() => {}}
              />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt='NFT IMAGE'
              width={700}
              height={700}
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigNFTSilder
