const { ethers } = require("ethers");

async function main() {
  const recipients = [
    "0x7CFA91BFA747D3C2cb0ee5244eb919c0BFC441cb",
    "0x26691872F6ad47bD662a803dF6c8924Fa14a487a",
    "0x41e041764CaEB67d2cf17C167d6F5Ff58B776E5b",
    "0x56A9D8d26Df84176618B86BD0D0d350A77d2802C",
    "0x045556439CF898AA980E2Cc7EAfb822c7904377A",
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const signer = provider.getSigner();

  const TagToken = await ethers.getContractFactory("TagToken");
  const tagToken = await TagToken.connect(signer).deploy(recipients);

  await tagToken.deployed();

  console.log("TagToken deployed to:", tagToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
