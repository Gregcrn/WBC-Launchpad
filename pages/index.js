import { useState, useEffect } from 'react';
// Context Ethereum
import { useEth } from '../context/index';
//Styles
import Style from '../styles/index.module.css';
// Image
import images from '../img';
// Components
import {
    HeroSection,
    OurServices,
    BigNFTSilder,
    Title,
    Category,
    Filter,
    NFTCard,
    Loader,
    FollowerTab,
    Slider,
    Brand,
    AlertWrongNetwork,
    AdminInterface,
} from '../components/index';

// Data
const nfts = [
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
    {
        image: 'https://i.seadn.io/gae/95KBIGR1Lf3mdUeMDALZ4CkqTj7F2XkXG_-Ax0v-m8oJF9dD1K5RQ2LbgMwNG_ZvmSImQkyVN8zxcCx18fZLl6eB-0v6C0hGaGQqCQ?auto=format&w=384',
        name: 'Saint Emilion',
        tokenId: '15432',
        price: '0.1 ETH',
    },
];
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
];

const Home = () => {
    const { state } = useEth();
    const {
        state: { contract, accounts },
    } = useEth();

    const [owner, setOwner] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [saleStatus, setSaleStatus] = useState(null);

    // Use effect
    useEffect(() => {
        // get owner
        const getOwner = async () => {
            if (accounts && contract) {
                const owner = await contract.methods.owner().call();
                setOwner(owner);
            }
        };
        // get current account
        const getCurrentAccount = async () => {
            if (accounts && contract) {
                const currentAccount = accounts[0];
                setCurrentAccount(currentAccount);
            }
        };
        // check if current account is owner
        const checkIsOwner = async () => {
            if (owner && currentAccount) {
                if (owner === currentAccount) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
        };
        // get enum sale status
        const getSaleStatus = async () => {
            if (contract) {
                const saleStatus = await contract.methods.saleState().call();
                setSaleStatus(saleStatus);
            }
        };

        getOwner();
        getCurrentAccount();
        checkIsOwner();
        getSaleStatus();
    }, [contract, accounts, owner, currentAccount]);

    // function to end sale from owner
    const startSale = async () => {
        if (contract) {
            try {
                return await contract.methods.startSale().send({
                    from: owner,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className={Style.homePage}>
            {!state.artifact ? (
                <Loader />
            ) : !state.contract ? (
                <AlertWrongNetwork />
            ) : (
                <>
                    {isOwner ? (
                        <AdminInterface
                            saleStatus={saleStatus}
                            startSale={startSale}
                        />
                    ) : (
                        <>
                            <HeroSection currentAccount={currentAccount} />
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
                            {nfts.length === 0 ? (
                                <Loader />
                            ) : (
                                <NFTCard NFTData={nfts} />
                            )}
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
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
