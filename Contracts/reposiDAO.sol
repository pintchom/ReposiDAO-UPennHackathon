// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Votes.sol";

/// @custom:security-contact pintchom@bc.edu
contract ReposiDAO is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {

    struct Proposal {
        string description;
        uint256 id;
        bool executed;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    // Track if a token holder has voted on a specific proposal
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    constructor(address initialOwner)
        ERC20("ReposiDAO", "REPO")
        Ownable(initialOwner)
        ERC20Permit("ReposiDAO")
    {
        proposalCount = 0;
    }

    // Function to create a new proposal
    function propose(string memory description) public onlyOwner returns (uint256) {
        uint256 newProposalId = proposalCount++;
        proposals[newProposalId] = Proposal({
            description: description,
            id: newProposalId,
            executed: false,
            votesFor: 0,
            votesAgainst: 0
        });
        return newProposalId;
    }

    function vote(uint256 proposalId, bool support) public {
        require(balanceOf(msg.sender) > 0, "No voting tokens held");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(proposalId < proposalCount, "Invalid proposal ID");

        Proposal storage proposal = proposals[proposalId];

        if (support) {
            proposal.votesFor += balanceOf(msg.sender);
        } else {
            proposal.votesAgainst += balanceOf(msg.sender);
        }

        hasVoted[proposalId][msg.sender] = true;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
