import React, { useState } from 'react';
import Button from '../Button/Button';
import Title from '../Title/Title';
import Style from './AdminInterface.module.css';

const AdminInterface = ({ saleStatus, startSale, endSale, sendRoyalties }) => {
    const [address, setAddress] = useState('');

    // get value of address input
    const handleChange = (e) => {
        setAddress(e.target.value);
    };
    return (
        <div>
            <Title
                heading="Interface Admin"
                paragraph="This is the interface of the admin who can start and end the session of minting"
            />
            <div className={Style.container_btn}>
                {saleStatus == 0 && (
                    <Button
                        btnName="Start the session of Mint"
                        handleClick={startSale}
                    />
                )}
                {saleStatus == 1 && (
                    <Button
                        btnName="End the session of Mint and reveal NFT"
                        handleClick={endSale}
                    />
                )}
                {saleStatus == 2 && (
                    // create a form to send royalties to the vineyard with input address and amount
                    <div className={Style.container_btn}>
                        <div className={Style.form}>
                            <p className={Style.address_title}>
                                Send royalties
                            </p>
                            <input
                                onChange={handleChange}
                                className={Style.input}
                                type="text"
                                placeholder="ETH Address"
                            ></input>
                            <Button
                                btnName="Send"
                                handleClick={() => sendRoyalties(address)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default AdminInterface;
