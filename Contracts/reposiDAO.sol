// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/extensions/ERC20Votes.sol";

/// @custom:security-contact pintchom@bc.edu
contract ReposiDAO is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {

    mapping(address => bool) private _isMinter;

    constructor(address initialOwner)
        ERC20("ReposiDAO", "REPO")
        Ownable(initialOwner)
        ERC20Permit("ReposiDAO")
    {
        transferOwnership(initialOwner);
        _isMinter[initialOwner] = true;
    }

    modifier onlyMinter() {
        require(_isMinter[_msgSender()], "Caller is not authorized to mint or transfer");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        _isMinter[to] = true;
    }

    function addMinter(address minter) public onlyOwner {
        _isMinter[minter] = true;
    }

    function removeMinter(address minter) public onlyOwner {
        _isMinter[minter] = false;
    }

    function transfer(address to, uint256 amount) public override onlyMinter returns (bool) {
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override onlyMinter returns (bool) {
        return super.transferFrom(from, to, amount);
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
