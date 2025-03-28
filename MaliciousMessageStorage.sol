// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MaliciousMessageStorage {
    uint256 public maliciousMessageCount = 0;  // ✅ Declare here

    struct Message {
        uint256 id;
        string messageType;
        string messageHash;
        address sender;
    }

    mapping(uint256 => Message) public messages;
    uint256 public messageCount = 0;

    event MessageStored(uint256 id, string messageType, string messageHash, address sender);

    function storeMessage(string memory _messageType, string memory _messageHash) public {
        messageCount++;
        messages[messageCount] = Message(messageCount, _messageType, _messageHash, msg.sender);
        
        // ✅ Ensure malicious count is updated correctly
        if (keccak256(abi.encodePacked(_messageType)) == keccak256(abi.encodePacked("Malicious"))) {
            maliciousMessageCount++; 
        }

        emit MessageStored(messageCount, _messageType, _messageHash, msg.sender);
    }

    function getMaliciousCount() public view returns (uint256) {
        return maliciousMessageCount;  // ✅ This should now be accessible
    }
}
