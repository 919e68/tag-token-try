// import React, { useEffect, useState } from "react";
// // import { useWeb3React } from "@web3-react/core";
// import { ethers } from "ethers";
// import TagTokenContract from "./contracts/TagToken.json";

// const ContractInteractionComponent = () => {
//   // const { account, library } = useWeb3React();
//   const [contract, setContract] = useState(null);
//   const [balance, setBalance] = useState(null);

//   // // Load the smart contract
//   // useEffect(() => {
//   //   const loadContract = async () => {
//   //     try {
//   //       const contractAddress = "0x779708Ac360A738792Cdb4c91E6b19eDB4E7569f";
//   //       const contractABI = TagTokenContract.abi;
//   //       // const signer = library.getSigner(account);
//   //       const loadedContract = new ethers.Contract(
//   //         contractAddress,
//   //         contractABI
//   //         // signer
//   //       );
//   //       setContract(loadedContract);
//   //     } catch (error) {
//   //       console.error("Error loading contract:", error);
//   //     }
//   //   };

//   //   if (library && account) {
//   //     loadContract();
//   //   }
//   // }, [library, account]);

//   // Get balance from the smart contract
//   useEffect(() => {
//     const getBalance = async () => {
//       try {
//         if (contract) {
//           const contractBalance = await contract.balanceOf(account);
//           setBalance(contractBalance.toString());
//         }
//       } catch (error) {
//         console.error("Error getting balance:", error);
//       }
//     };

//     if (contract) {
//       getBalance();
//     }
//   }, [contract, account]);

//   // Function to interact with the smart contract
//   const interactWithContract = async () => {
//     try {
//       if (contract) {
//         const transaction = await contract.someFunction();
//         await transaction.wait();
//         console.log("Transaction successful!");
//         // Do something after the transaction is successful
//       }
//     } catch (error) {
//       console.error("Error interacting with contract:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Contract Interaction</h1>
//       <p>Account: {account}</p>
//       <p>Contract Balance: {balance}</p>
//       <button onClick={interactWithContract}>Interact with Contract</button>
//     </div>
//   );
// };

const ContractInteractionComponent = () => {
  return <div>ContractInteractionComponent</div>;
};

export default ContractInteractionComponent;
