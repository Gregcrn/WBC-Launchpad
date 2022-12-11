import React from 'react';
import Button from '../Button/Button';
import Title from '../Title/Title';
import Style from './AdminInterface.module.css';

const AdminInterface = ({ saleStatus, startSale, endSale, sendRoyalties }) => {
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
                    <Button
                        btnName="Send Royalties to the Vineyard"
                        handleClick={sendRoyalties}
                    />
                )}
            </div>
        </div>
    );
};
export default AdminInterface;
