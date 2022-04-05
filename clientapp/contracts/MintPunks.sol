// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract MintPunks is ERC721A, PaymentSplitter {
    using SafeMath for uint256;

    address[] private PAY_LIST = [
        0xAE7B0aF0540B8132583d5d089794b37d131ab7ef,
        0x72ebe2a01756f1A3dA2073c97B110CC82A387a65,
        0x44e555546fFA4e3e5718C74BDe9Da88fF6dA0d52
    ];
    uint256[] private PAY_SHARES = [50, 25, 25];
    uint256 public constant TOKEN_PRICE = 0.1 ether;
    uint128 public constant MAX_SUPPLY = 10000;
    uint128 public constant MAX_PURCHASE = 20;
    string private baseTokenUri;

    constructor()
        payable
        ERC721A("Wagmi Punks", "WaP")
        PaymentSplitter(PAY_LIST, PAY_SHARES)
    {
        baseTokenUri = "http://127.0.0.1:10000/devstoreaccount1/wagmi-punks/nft/punk/json/";
    }

    function presaleMint(uint256 numberOfTokens) public payable {
        uint256 totalCost = TOKEN_PRICE.mul(numberOfTokens);
        // require(totalCost < msg.value, "Ether value sent is too low");
        // require(totalCost > msg.value, "Ether value sent is too high");

        _safeMint(msg.sender, numberOfTokens);
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

    function getBaseURI() public view returns (string memory) {
        return baseTokenUri;
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
}
