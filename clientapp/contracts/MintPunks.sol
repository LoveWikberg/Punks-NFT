// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract MintPunks is ERC721A, PaymentSplitter {
    using SafeMath for uint256;

    address[] private PAY_LIST = [
        0xEAE1b5133f97fbbe0ab8b7578907d395d41ab46b,
        0xf7B8dDeCdf914CfE5A62968A357Dc609DAd08E19,
        0xb0C34A989f774f641E2C7672Da85B2B79285dF4f
    ];
    uint256[] private PAY_SHARES = [50, 25, 25];
    uint256 public constant TOKEN_PRICE = 0.1 ether;
    uint128 public constant MAX_SUPPLY = 6969;
    uint128 public constant MAX_PURCHASE = 20;
    string private baseTokenUri;

    constructor()
        payable
        ERC721A("Wagmi Punks", "WaP")
        PaymentSplitter(PAY_LIST, PAY_SHARES)
    {
        baseTokenUri = "http://127.0.0.1:8887/";
    }

    function getSenderTest() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function presaleMint(uint256 numberOfTokens)
        public
        payable
        returns (uint256)
    {
        uint256 totalCost = TOKEN_PRICE.mul(numberOfTokens);
        // require(totalCost <= msg.value, "Ether value sent is too low");
        _safeMint(msg.sender, numberOfTokens);

        return msg.value;
    }

    function totalSupp() public view returns (uint256) {
        return totalSupply();
    }

    function tokenURIData(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getTotalShares() public view returns (uint256) {
        return totalShares();
    }

    function releaseShares(address payable account) public {
        return release(account);
    }

    function releasedShares() public view returns (uint256) {
        return totalReleased();
    }

    function releasedSharesTo(address account) public view returns (uint256) {
        return released(account);
    }

    function tokensOfOwner() public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(msg.sender);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalPunks = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all cats have IDs starting at 1 and increasing
            // sequentially up to the totalCat count.
            uint256 punkId;

            for (punkId = 0; punkId < totalPunks; punkId++) {
                if (ownerOf(punkId) == msg.sender) {
                    result[resultIndex] = punkId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenUri;
    }

    function changeBaseTokenURI(string memory newURI) public {
        baseTokenUri = newURI;
    }

    modifier isTokenOwner(uint256 tokenId) {
        address tokenAddress = ownerOf(tokenId);
        require(
            tokenAddress == msg.sender,
            "Method can only be called by the ownder of this token"
        );
        _;
    }

    function changeTokenURI(uint256 tokenId, string memory tokenAddress) public {
        _setTokenURI(tokenId, tokenAddress);
    }
}
