// import { ethers } from "ethers";
// import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

// import ContractInteractionComponent from "./ContractInteractionComponent";
import Shop from "./Shop";

import "./styles/tailwind.css";

// const getLibrary = (provider) => {
//   return new ethers.providers.Web3Provider(provider);
// };

function App() {
  return (
    <div className="flex justify-center items-center ">
      <Shop />
    </div>
  );
}

export default App;
