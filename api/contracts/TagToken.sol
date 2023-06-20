// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract TagToken {
string public name = "The Alchemist Guild coin";
    string public symbol = "TAG";
    uint256 public totalSupply;
    uint8 public decimals = 18;
    uint256 public remainingSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        totalSupply = 1_000_000 * (10 ** decimals);
        remainingSupply = totalSupply;

        // distribute supply to main owners
        uint256 supplyPerOwner = totalSupply / 5;

        address[] memory owners = new address[](5);
        owners[0] = address(0x7CFA91BFA747D3C2cb0ee5244eb919c0BFC441cb);
        owners[1] = address(0x26691872F6ad47bD662a803dF6c8924Fa14a487a);
        owners[2] = address(0x41e041764CaEB67d2cf17C167d6F5Ff58B776E5b);
        owners[3] = address(0x56A9D8d26Df84176618B86BD0D0d350A77d2802C);
        owners[4] = address(0x045556439CF898AA980E2Cc7EAfb822c7904377A);

        for (uint256 i = 0; i < owners.length; i++) {
            address owner = owners[i];
            balanceOf[owner] = supplyPerOwner;
            emit Transfer(address(0), owner, supplyPerOwner);
            remainingSupply -= supplyPerOwner;

            // add spender and approve the transfer
            address spender = address(owner);
            uint256 allowanceAmount = supplyPerOwner;
            allowance[owner][spender] = allowanceAmount;
            emit Approval(owner, spender, allowanceAmount);
        }
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");

        balanceOf[from] -= value;
        balanceOf[to] += value;

        allowance[from][msg.sender] -= value;

        emit Transfer(from, to, value);
        return true;
    }
}