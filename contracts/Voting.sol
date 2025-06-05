// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    address public admin;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;
    mapping(uint256 => string) public candidates;
    uint256 public candidateCount;

    // Custom errors
    error OnlyAdmin();
    error InvalidCandidate();
    error AlreadyVoted();

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory name) public {
        if (msg.sender != admin) revert OnlyAdmin();
        candidates[candidateCount] = name;
        candidateCount++;
    }

    function vote(uint256 candidateId) public {
        if (candidateId >= candidateCount) revert InvalidCandidate();
        if (hasVoted[msg.sender]) revert AlreadyVoted();

        votes[candidateId]++; 
        (bool success, ) = msg.sender.call(""); 
        require(success, "Call failed");

        hasVoted[msg.sender] = true; 
    }

    function getResults(uint256 candidateId) public view returns (uint256) {
        if (candidateId >= candidateCount) revert InvalidCandidate();
        return votes[candidateId];
    }

    function transferAdmin(address newAdmin) public {
        if (msg.sender != admin) revert OnlyAdmin();
        admin = newAdmin; 
    }
}// coinmarketcap: "c5e732ea-fbd3-4623-8c4c-a6934952a82d",