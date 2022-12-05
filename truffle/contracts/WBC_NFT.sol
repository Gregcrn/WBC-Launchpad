// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title WBTC_ERC721
 * WBTC_ERC721 - a contract for my non-fungible WBTCs.
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation with ERC721Enumerable, PyamentSplitter, Ownable, ReentrancyGuard with a whitelist
 */

contract WBC_NFT is
    ERC721Enumerable,
    PaymentSplitter,
    Ownable,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    // Counter for tokenIds
    Counters.Counter private _tokenIds;

    // Concatenate the URL of an NFT
    using Strings for uint256;

    // Merkle root
    bytes32 public merkleRoot;
    // Max supply of NFTs
    uint256 public MAX_SUPPLY = 150;
    // Max NFTs per address
    uint256 public MAX_PER_ADDRESS = 2;
    // Presale price
    uint256 public PRESALE_PRICE = 0.0001 ether;
    // Sale price
    uint256 public SALE_PRICE = 0.0002 ether;
    // URI of the NFTs when not revealed
    string private baseTokenURI;
    // URI of the NFTs when revealed
    string private revealedBaseTokenURI;
    // Extension of metadata
    string private extension = ".json";
    // Boolean to check if the NFTs are revealed
    bool public isRevealed = false;
    // Enum of the sale status
    enum SaleStatus {
        NOT_STARTED,
        PRESALE,
        SALE,
        ENDED
    }
    // Sale status
    SaleStatus public saleStatus;
    // Members of the WBTC team
    address[] private _members = [
        0xcFc409c6FC65467d34Da7700600794aA6cC8a5E1,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, //change it
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db // change it
    ];
    // Shares of the WBTC team
    uint256[] private _shares = [50, 25, 25];
    // Number of tokens per address
    mapping(address => uint256) private _tokensPerAddress;

    // Constructor of the ERC721 contract with the PaymentSplitter
    constructor(
        string memory _baseTokenURI,
        string memory _revealedBaseTokenURI,
        bytes32 _merkleRoot
    ) ERC721("WBTC", "WBTC") PaymentSplitter(_members, _shares) {
        // Increment the tokenIds
        _tokenIds.increment();
        // Set the sales status to NOT_STARTED
        saleStatus = SaleStatus.NOT_STARTED;
        // Set the baseTokenURI
        baseTokenURI = _baseTokenURI;
        // Set the revealedBaseTokenURI
        revealedBaseTokenURI = _revealedBaseTokenURI;
        // Set the merkleRoot
        merkleRoot = _merkleRoot;
    }

    /**
     * @dev Require tx.origin to be not a contract
     */
    modifier notContract() {
        require(tx.origin == msg.sender, "Contracts not allowed");
        _;
    }

    /**
     * @dev Set the Merkle root
     * @param _merkleRoot Merkle root
     */
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /**
     * @dev Change the number of NFTs per address
     * @param _maxPerAddress Max NFTs per address
     */
    function setMaxPerAddress(uint256 _maxPerAddress) external onlyOwner {
        require(_maxPerAddress > 0, "Max per address must be greater than 0");
        MAX_PER_ADDRESS = _maxPerAddress;
    }

    /**
     * @dev Change the max supply of NFTs
     * @param _maxSupply Max supply of NFTs
     */
    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > 0, "Max supply must be greater than 0");
        MAX_SUPPLY = _maxSupply;
    }

    /**
     * @dev Change the presale price
     * @param _presalePrice Presale price
     */
    function setPresalePrice(uint256 _presalePrice) external onlyOwner {
        require(_presalePrice > 0, "Presale price must be greater than 0");
        PRESALE_PRICE = _presalePrice;
    }

    /**
     * @dev Change the sale price
     * @param _salePrice Sale price
     */
    function setSalePrice(uint256 _salePrice) external onlyOwner {
        require(_salePrice > 0, "Sale price must be greater than 0");
        SALE_PRICE = _salePrice;
    }

    /**
     * @dev Change the baseTokenURI
     * @param _baseTokenURI BaseTokenURI
     */
    function setBaseTokenURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /**
     * @dev Change the revealedBaseTokenURI
     * @param _revealedBaseTokenURI RevealedBaseTokenURI
     */
    function setRevealedBaseTokenURI(string memory _revealedBaseTokenURI)
        external
        onlyOwner
    {
        revealedBaseTokenURI = _revealedBaseTokenURI;
    }

    /**
     * @dev Change the extension of the metadata
     * @param _extension Extension of the metadata
     */
    function setExtension(string memory _extension) external onlyOwner {
        extension = _extension;
    }

    // GESTION OF TOKEN URI and ID
    /**
     * @dev Returns the token URI of the given token ID.
     * @param tokenId uint256 ID of the token to query
     * @return string URI of the given token ID
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = isRevealed
            ? revealedBaseTokenURI
            : baseTokenURI;

        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(baseURI, tokenId.toString(), extension)
                )
                : "";
    }

    // GESTION OF STATUS
    /**
     * @dev Start the presale
     */
    function startPresale() external onlyOwner {
        require(
            saleStatus == SaleStatus.NOT_STARTED,
            "Presale has already started"
        );
        saleStatus = SaleStatus.PRESALE;
    }

    /**
     * @dev Start the sale
     */
    function startSale() external onlyOwner {
        require(
            saleStatus == SaleStatus.PRESALE,
            "Presale has not started yet"
        );
        saleStatus = SaleStatus.SALE;
    }

    /**
     * @dev End the sale
     */
    function endSale() external onlyOwner {
        require(saleStatus == SaleStatus.SALE, "Sale has not started yet");
        saleStatus = SaleStatus.ENDED;
    }

    // END GESTION OF STATUS
    /**
     * @dev Reveal the NFTs
     */
    function reveal() external onlyOwner {
        require(!isRevealed, "NFTs are already revealed");
        isRevealed = true;
    }

    // WHITELISTING FUNCTIONS
    /**
     * @dev Check if an address is whitelisted
     * @param _address Address to check
     * @param _index Index of the address in the merkle tree
     * @param _proof Proof of the address in the merkle tree
     * @return Boolean to check if the address is whitelisted
     */
    function isWhitelisted(
        address _address,
        uint256 _index,
        bytes32[] calldata _proof
    ) public view returns (bool) {
        bytes32 node = keccak256(abi.encodePacked(_index, _address));
        return MerkleProof.verify(_proof, merkleRoot, node);
    }

    // MINTING FUNCTIONS
    /**
     * @dev Mint NFTs in presale session and if the user is in the whitelist
     * @param _to Address of the user
     * @param _amount Amount of NFTs to mint
     * @param _proof Proof of the user
     */
    function mintPresale(
        address _to,
        uint256 _amount,
        bytes32[] calldata _proof
    ) external payable notContract {
        require(
            saleStatus == SaleStatus.PRESALE,
            "Presale has not started yet"
        );
        require(_amount <= MAX_PER_ADDRESS, "You can mint a maximum of 2 NFTs");
        require(
            _tokensPerAddress[_to] + _amount <= MAX_PER_ADDRESS,
            "You can mint a maximum of 2 NFTs"
        );
        require(
            msg.value == PRESALE_PRICE * _amount,
            "Incorrect amount of ETH sent"
        );
        require(
            isWhitelisted(_to, _tokensPerAddress[_to], _proof),
            "You are not whitelisted"
        );
        // Mint the NFTs
        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(_to, _tokenIds.current());
            _tokenIds.increment();
        }
        // Increment the tokens per address
        _tokensPerAddress[_to] += _amount;
    }

    /**
     * @dev Mint NFTs in sale session
     * @param _amount Amount of NFTs to mint
     */
    function mintSale(uint256 _amount) external payable notContract {
        require(saleStatus == SaleStatus.SALE, "Sale has not started yet");
        require(_amount <= MAX_PER_ADDRESS, "You can mint a maximum of 2 NFTs");
        require(
            _tokensPerAddress[msg.sender] + _amount <= MAX_PER_ADDRESS,
            "You can mint a maximum of 2 NFTs"
        );
        require(
            msg.value == SALE_PRICE * _amount,
            "Incorrect amount of ETH sent"
        );
        // Mint the NFTs
        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(msg.sender, _tokenIds.current());
            _tokenIds.increment();
        }
        // Increment the tokens per address
        _tokensPerAddress[msg.sender] += _amount;
        // Sold out when the max supply is reached
        if (_tokenIds.current() == MAX_SUPPLY) {
            saleStatus = SaleStatus.ENDED;
        }
    }

    // END MINTING FUNCTIONS
    // AIR DROP FUNCTIONS
    /**
     * @dev Mint NFTs for the airdrop
     * @param _to Address of the user
     * @param _amount Amount of NFTs to mint
     */
    function mintAirdrop(address _to, uint256 _amount) external onlyOwner {
        require(
            _tokenIds.current() + _amount <= MAX_SUPPLY,
            "Max supply reached"
        );
        // Mint the NFTs
        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(_to, _tokenIds.current());
            _tokenIds.increment();
        }
    }
}
