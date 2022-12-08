import React from 'react'

const Success = () => {
    return (
        <div id="container">
            <div id="success-box">
                <div class="dot"></div>
                <div class="dot two"></div>
                <div class="face">
                    <div class="eye"></div>
                    <div class="eye right"></div>
                    <div class="mouth happy"></div>
                </div>
                <div class="shadow scale"></div>
                <div class="message"><h1 class="alert">Success!</h1><p>yay, everything is working.</p></div>
                <button class="button-box"><h1 class="green">continue</h1></button>
            </div>
        </div>
    )
}

export default Success