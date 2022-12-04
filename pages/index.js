import { useState } from 'react'
//Styles
import Style from '../styles/index.module.css'
// Image
import images from '../img'
// Components
import {HeroSection, OurServices, BigNFTSilder, Subscribe, Title, Category, Filter, NFTCard, Loader, FollowerTab, Slider, Brand} from "../components/index"


const Home = () => {
    const nfts = [
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        },
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        },
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        },
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        },
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        },
        {
          image: "https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384",
          name: "Saint Emilion",
          tokenId: "15432",
          price: "0.1 ETH",
        }
    ]
    const vineyards = [
      {
        background: images.member,
        seller: '0x720...83u',
      },
      {
        background: images.member,
        seller: '0x720...93u',
      },
      {
        background: images.member,
        seller: '0x720...93u',
      },
      {
        background: images.member,
        seller: '0x720...93u',
      },
    ]

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <OurServices />
      <Title 
        heading="Our last collections "
        paragraph="by designer around the world"
      />
      <BigNFTSilder />
      <Title 
        heading="Featured NFTs"
        paragraph="Discover our best NFTs on te market"
      />
      <Filter />
      {nfts.length === 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <Title 
        heading="Featured collections"
        paragraph="Discover our best collections on the market"
      />
      {vineyards.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={vineyards} />
        )} 
      <Title 
        heading="Featured Vineyards"
        paragraph="Discover the latest Vineyards choose by our community"
      />
      <Category />
      <Slider />
      <Brand />
      {/* <Subscribe /> */}
    </div>
  )
}

export default Home;