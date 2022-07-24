// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


// deployed to Goerli at 0x567188dE1eE4dA1a45D45192fca340A5e2A86D37
contract BuyMeACoffee{
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "can't buy coffee with 0 eth");

        memos.push(Memo(
            msg.sender, 
            block.timestamp, 
            _name, 
            _message
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));

    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }



}