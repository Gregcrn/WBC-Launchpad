// Contract with openzeppelin ownable, String, Counters, Ownable, ERC721,PaymentSplitter and ReentrancyGuard
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/finance/PaymentSplitter.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

contract WBC_NFT is ERC721, Ownable, PaymentSplitter, ReentrancyGuard {
    // Counter for tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // Max Supply
    uint256 public constant MAX_SUPPLY = 170;
    // Max Nfts per address
    uint256 public constant MAX_NFTS_PER_ADDRESS = 2;
    // Price
    uint256 public constant PRICE = 1 ether;
    // Extension of the base URI
    string private extension = '.json';
    // boolean to know if it's revealed
    bool private _isRevealed = false;
    // Members of the team to receive the payments
    address[] private _teamMembers = [
        0xA65342E5a81Cab20595A8e4F73758350056Ac5C1,
        0x6D80Ab5FBbb46421B8CA1ee35A4b1150BeB22E96
    ];
    // Shares of the team members
    uint256[] private _teamShares = [50, 50];
    // mapping address bool to check if address has minted
    mapping(address => bool) private _hasMinted;
    // mapping of all the NFTs by address
    mapping(address => uint256[]) private _nftsByAddress;

    // EVENTS
    /**
     * @dev Event to emit when the NFT is minted
     */
    event NFTMinted(address indexed to, uint256 indexed tokenId);

    // Merkle Root
    bytes32 public merkleRoot;

    /**
     * @dev Enum of workflow steps for the sale
     */
    enum SaleState {
        NotStarted,
        Started,
        Ended
    }
    /**
     * @dev SaleState of the sale
     */
    SaleState public saleState;

    /**
     * @dev Contrusctor of the contract with the name, symbol and the team members and shares with Merkle Root
     */
    constructor(bytes32 _MerkleRoot)
        ERC721('WBC NFT', 'WBC')
        PaymentSplitter(_teamMembers, _teamShares)
    {
        merkleRoot = _MerkleRoot;
        saleState = SaleState.NotStarted;
    }

    /**
     * @dev Modifier to check if the msg.sender has not a contract
     */
    modifier notContract() {
        require(
            msg.sender == tx.origin,
            'Sorry, contracts are not allowed to interact with this contract'
        );
        _;
    }

    /**
     * @dev verify the proof of the merkle tree
     */
    function _verify(bytes32 leaf, bytes32[] memory proof)
        internal
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    /**
     * @dev create the leaf of the merkle tree
     */
    function _leaf(address account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    /**
     * @dev
     */
    function isWhiteListed(address account, bytes32[] calldata proof)
        internal
        view
        returns (bool)
    {
        return _verify(_leaf(account), proof);
    }

    /**
     * @dev Mint NFTs for the msg.sender if the conditions are met and the msg.value is correct
     * @param _proof The proof of the merkle tree
     */
    function mint_nft(bytes32[] calldata _proof)
        public
        payable
        nonReentrant
        notContract
    {
        // Check if the max supply has been reached
        require(_tokenIds.current() < MAX_SUPPLY, 'Max supply reached');
        // check if balance of msg.sender is less than 2
        require(
            balanceOf(msg.sender) < MAX_NFTS_PER_ADDRESS,
            'You have already minted 2 NFTs'
        );
        // Check if the msg.sender send enough ETH to buy the NFT
        require(msg.value >= PRICE, 'Not enough ETH sent');
        // Check if the sale has started
        require(saleState == SaleState.Started, 'Sale has not started yet');
        // Require the msg.sender to be whitelisted
        require(
            isWhiteListed(msg.sender, _proof),
            'You are not whitelisted to buy this NFT'
        );
        // Mint the NFT
        _safeMint(msg.sender, _tokenIds.current());
        // Increment the tokenIds
        _tokenIds.increment();
        // Set the address to true
        _hasMinted[msg.sender] = true;
        // Event to emit when the NFT is minted
        emit NFTMinted(msg.sender, _tokenIds.current());
    }

    /**
        @dev This tokenURI function is used to change the base URI when it's revealed
        */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        if (_isRevealed == false) {
            return
                string(
                    abi.encodePacked(
                        'ipfs://QmdgFwpHA8SQK4mH6cwW4TvBhiZqQ2RNbmFrYDUg9pqrMj/hidden'
                    )
                );
        } else {
            return
                string(
                    abi.encodePacked(
                        'bafybeidtu2h3g6ynef6nkjieo6rtybdzga4sz2c6uh64en6m45vxzpgeyq',
                        Strings.toString(tokenId),
                        extension
                    )
                );
        }
    }

    /**
     * @dev get the NFTs by address
     */
    function getNFTsByAddress(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return _nftsByAddress[_address];
    }

    // SESSION GESTION
    /**
     * @dev Start the sale
     */
    function startSale() public onlyOwner {
        saleState = SaleState.Started;
    }

    /**
     * @dev End the sale
     */
    function endSale() public onlyOwner {
        saleState = SaleState.Ended;
        // reveal the NFTs
        _isRevealed = true;
    }
}
