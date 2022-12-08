import React from 'react'
// Styles
import Style from './AlertWrongNetwork.module.css'

const AlertWrongNetwork = () => {
    return (
        <div className={Style.hipContainer}>
            <div className={Style.container}>
                <div className={Style.errorbox}>
                    <div className={Style.dot}></div>
                    <div className={Style.two}></div>
                    <div className={Style.face2}>
                        <div className={Style.eye}></div>
                        <div className={Style.right}></div>
                        <div className={Style.mouthsad}></div>
                    </div>
                    <div className={Style.shadow_move}></div>
                    <div className={Style.message}>
                        <h1 className={Style.alert}>Error!</h1>
                        <p className={Style.text}>Wrong netWork, please set Goerlie Network on Metamask</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertWrongNetwork
