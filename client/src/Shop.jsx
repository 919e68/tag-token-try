import BN from "bn.js";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import TagTokenContract from "./contracts/TagToken.json";

const Shop = () => {
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [tagToken, setTagToken] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [tagBalance, setTagBalance] = useState(null);
  const [amount, setAmount] = useState(1);
  const networkId = 5777;

  const CONTRACT_ADDRESS = "0x87524F735750FF2C95951e519E4240a63B47Aa84";
  const decimals = 18;

  // Array of seller addresses
  const sellerAddresses = [
    "0x7CFA91BFA747D3C2cb0ee5244eb919c0BFC441cb",
    "0x26691872F6ad47bD662a803dF6c8924Fa14a487a",
    "0x41e041764CaEB67d2cf17C167d6F5Ff58B776E5b",
    "0x56A9D8d26Df84176618B86BD0D0d350A77d2802C",
    "0x045556439CF898AA980E2Cc7EAfb822c7904377A",
  ];

  useEffect(() => {
    initializeWeb3();

    // Add event listener for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Clean up event listener on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  useEffect(() => {
    if (tagToken && accounts.length > 0) {
      updateBalances();
    }
  }, [tagToken, accounts]);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccounts(accounts);
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const tagTokenInstance = new web3Instance.eth.Contract(
          TagTokenContract.abi,
          CONTRACT_ADDRESS
        );
        setTagToken(tagTokenInstance);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };

  const updateBalances = async () => {
    try {
      if (accounts.length > 0) {
        const ethBalance = await web3.eth.getBalance(accounts[0]);
        const tagBalance = await tagToken.methods.balanceOf(accounts[0]).call();
        setEthBalance(web3.utils.fromWei(ethBalance.toString(), "ether"));
        setTagBalance(web3.utils.fromWei(tagBalance.toString(), "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccountsChanged = (newAccounts) => {
    setAccounts(newAccounts);
    updateBalances();
  };

  const handleBuy = async () => {
    try {
      const amountInWei = web3.utils.toWei(amount.toString(), "ether");

      // Convert the amount to a string to handle larger values
      const amountInWeiString = amountInWei.toString();

      // Calculate the equivalent TAG amount based on the decimal count

      const tagAmount = new BN(amountInWeiString).mul(
        new BN(10).pow(new BN(decimals))
      );

      // Choose a random seller address
      const randomSeller =
        sellerAddresses[Math.floor(Math.random() * sellerAddresses.length)];

      // Set a different amount for each seller
      const sellerAmounts = [10, 10, 10, 10, 10]; // Amounts in ETH per seller
      const sellerIndex = sellerAddresses.indexOf(randomSeller);
      const sellerEthAmount = sellerAmounts[sellerIndex];
      const ethAmountInWei = web3.utils.toWei(
        sellerEthAmount.toString(),
        "ether"
      );

      console.log("ethAmountInWei", ethAmountInWei);

      await tagToken.methods
        .approve(
          "0x6d9b77b36e4c8f0d5c589070ff715bcaaf3abdf9",
          tagAmount.toString()
        )
        .send({ from: accounts[0] });

      await tagToken.methods
        .transferFrom(randomSeller, accounts[0], tagAmount.toString())
        .send({ from: accounts[0] });

      updateBalances();

      console.log(
        `Successfully purchased ${amount} TAG tokens from ${randomSeller} for ${sellerEthAmount} ETH (${web3.utils.fromWei(
          ethAmountInWei.toString(),
          "ether"
        )} ETH)!`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">TagToken Shop</h1>

        <div className="mb-5">
          <div className="text-gray-700 text-center">Wallet Address</div>
          <div className="bg-gray-200 p-2 font-mono text-center">
            {accounts[0]}
          </div>
        </div>

        {ethBalance !== null && (
          <div className="mb-2">
            <div className="text-gray-700 text-center">ETH Balance</div>
            <div className="bg-gray-200 p-2 font-mono text-center">
              {ethBalance} ETH
            </div>
          </div>
        )}

        {tagBalance !== null && (
          <div>
            <div className="text-gray-700 text-center">TAG Balance</div>
            <div className="bg-gray-200 p-2 font-mono text-center">
              {tagBalance} TAG
            </div>
          </div>
        )}

        <div className="my-4 flex items-center">
          <label htmlFor="amount" className="mr-2 text-gray-700 w-[190px]">
            Amount (ETH):
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border border-gray-300 px-2 py-1 rounded"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleBuy}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy TAG Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
