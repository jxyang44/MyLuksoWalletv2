// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol";

contract MLWBuildUPCard is LSP7CappedSupply {
    uint256 public cost = 1;
    address public tokenOwner;         

    constructor(string memory name,
        string memory symbol,
        address newOwner,
        bool isNFT) 
    LSP7CappedSupply(name, symbol, newOwner, isNFT) {
        tokenOwner = msg.sender;
        uint256 n = 1000;
        _mint(msg.sender, n * 10**uint(decimals()));        
    }

    receive() external payable {        
    
        uint256 amount = msg.value * cost;   
        require(balanceOf(tokenOwner) >= amount, "Not enough tokens");
        _transfer(tokenOwner, msg.sender, amount);
        emit Transfer(tokenOwner, msg.sender, amount);
        // send the ether earned to the token owner
        payable(tokenOwner).transfer(msg.value);
    }
}