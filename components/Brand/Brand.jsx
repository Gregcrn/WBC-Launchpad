import React from 'react'

//INTERNAL IMPORT
import Style from './Brand.module.css'
const Brand = () => {
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <h1>Earn free crypto with WBC</h1>
          <p>A great way to lead and inspire.</p>
        </div>
      </div>
    </div>
  )
}

export default Brand
