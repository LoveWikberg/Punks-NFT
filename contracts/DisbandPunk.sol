// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MintPunks is ERC721A {
    using SafeMath for uint256;

    uint256 public constant TOKEN_PRICE = 0.001 ether;
    uint128 public constant MAX_PURCHASE = 20;

    string private baseTokenUri;

    constructor() ERC721A("Wagmi Punks", "WaP") {
        baseTokenUri = "../metadata/";
    }

    function mintAssets(uint256 numberOfTokens) public payable {
        uint256 totalCost = TOKEN_PRICE.mul(numberOfTokens);
        _safeMint(msg.sender, numberOfTokens);
    }
}