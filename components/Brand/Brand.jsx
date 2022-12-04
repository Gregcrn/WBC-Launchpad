import React from 'react'
import Image from 'next/image'
import { DiJqueryLogo } from 'react-icons/di'
import { useRouter } from 'next/router'

//INTERNAL IMPORT
import Style from './Brand.module.css'
import images from '../../img'
import { Button } from '../../components/index.js'
import Link from 'next/link'

const Brand = () => {
  const router = useRouter()
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <h1>Earn free crypto with WBC</h1>
          <p>A great way to lead and inspire.</p>
        </div>
        <div className={Style.Brand_box_right}>
          <Image
            src={images.earn}
            alt='brand logo'
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  )
}

export default Brand
