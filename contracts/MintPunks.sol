// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MintPunks is ERC721A {
    using SafeMath for uint256;

    uint256 public constant TOKEN_PRICE = 0.01 ether;
    uint128 public constant MAX_SUPPLY = 6969;
    uint128 public constant MAX_PURCHASE = 20;
    string private baseTokenUri;

    constructor() ERC721A("Wagmi Punks", "WaP") {
        baseTokenUri = "C:/Users/lwikberg/Documents/dev/Egna projekt/NFTs/Metadata/";
    }

    function getSenderTest() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function presaleMint(uint256 numberOfTokens) public payable {
        uint256 totalCost = TOKEN_PRICE.mul(numberOfTokens);
        _safeMint(msg.sender, numberOfTokens);
    }

    function totalSupp() public view returns (uint256) {
        return totalSupply();
    }

    function tokenURIData(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
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
}
