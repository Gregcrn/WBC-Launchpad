import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

//----IMPORT ICON
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuRight } from 'react-icons/cg';
import { useRouter } from 'next/router';

//----IMPORT CONTEXT
import { useEth } from '../../context/index';

//INTERNAL IMPORT
import Style from './NavBar.module.css';
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import { Button, Error } from '../index';
import images from '../../img';
import Link from 'next/link';
import { shortenAddress } from '../../utils/shortenAddress';

const NavBar = () => {
    //----USESTATE COMPONNTS
    const [currentAccount, setCurrentAccount] = useState('');
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const router = useRouter();

    const {
        state: { contract, accounts },
    } = useEth();

    useEffect(() => {
        // get current account
        const getCurrentAccount = async () => {
            if (accounts && contract) {
                const currentAccount = accounts[0];
                setCurrentAccount(currentAccount);
            }
        };
        getCurrentAccount();
    }, [accounts, contract]);

    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if (btnText == 'Discover') {
            setDiscover(true);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        } else if (btnText == 'Help Center') {
            setDiscover(false);
            setHelp(true);
            setNotification(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
    };

    const openNotification = () => {
        if (!notification) {
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotification(false);
        }
    };

    const openProfile = () => {
        if (!profile) {
            setProfile(true);
            setHelp(false);
            setDiscover(false);
            setNotification(false);
        } else {
            setProfile(false);
        }
    };

    const openSideBar = () => {
        if (!openSideMenu) {
            setOpenSideMenu(true);
        } else {
            setOpenSideMenu(false);
        }
    };

    // function to connect the wallet
    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Link href="/">
                            <Image
                                src={images.wineBottleLogo}
                                alt="Wine Bottle club logo"
                                width={200}
                                height={200}
                            />
                        </Link>
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div
                            className={
                                Style.navbar_container_left_box_input_box
                            }
                        >
                            <input type="text" placeholder="Search NFT" />
                            <BsSearch
                                onClick={() => {}}
                                className={Style.search_icon}
                            />
                        </div>
                    </div>
                </div>

                {/* //END OF LEFT SECTION */}
                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}>
                        {/* DISCOVER MENU */}
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                            <div
                                className={
                                    Style.navbar_container_right_discover_box
                                }
                            >
                                <Discover />
                            </div>
                        )}
                    </div>

                    {/* HELP CENTER MENU */}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {help && (
                            <div
                                className={
                                    Style.navbar_container_right_help_box
                                }
                            >
                                <HelpCenter />
                            </div>
                        )}
                    </div>

                    {/* NOTIFICATION */}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications
                            className={Style.notify}
                            onClick={() => openNotification()}
                        />
                        {notification && <Notification />}
                    </div>

                    {/* CREATE BUTTON SECTION */}
                    <div className={Style.navbar_container_right_button}>
                        {/* {currentAccount == '' ? ( */}
                        <Button
                            svg
                            btnName={
                                currentAccount
                                    ? shortenAddress(currentAccount)
                                    : 'Connect'
                            }
                            handleClick={connectWallet}
                            // icon={images}
                        />
                    </div>

                    {/* USER PROFILE */}

                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            <Image
                                src={images.user1}
                                alt="Profile"
                                width={67}
                                height={60}
                                onClick={() => openProfile()}
                                className={Style.navbar_container_right_profile}
                            />

                            {profile && (
                                <Profile currentAccount={currentAccount} />
                            )}
                        </div>
                    </div>

                    {/* MENU BUTTON */}

                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight
                            className={Style.menuIcon}
                            onClick={() => openSideBar()}
                        />
                    </div>
                </div>
            </div>

            {/* SIDBAR CPMPONE/NT */}
            {openSideMenu && (
                <div className={Style.sideBar}>
                    <SideBar
                        setOpenSideMenu={setOpenSideMenu}
                        currentAccount={currentAccount}
                        connectWallet={connectWallet}
                    />
                </div>
            )}

            {/* {openError && <Error />} */}
        </div>
    );
};

export default NavBar;
