const { ethers, JsonRpcProvider } = require('ethers')
const TagToken = require('../TagToken.json')

const CONTRACT_ADDRESS = '0xfCC89a144Ae77e174E637587A193272C90088809'
const CONTRACT_ABI = TagToken.abi

async function transferTokens() {
  // Set up Ethereum provider
  const provider = new JsonRpcProvider('http://127.0.0.1:7545')

  // Wallet private key of the sender
  const senderPrivateKey = '85409d8b27a0ae3880fd1e1dd6562714b9ced0030146138915c2bc91e3d660a4'

  // Recipient address
  const recipientAddress = '0x9a937916767D26DAad927c4A2E7fE1c3F3f981b9'

  // Token contract address
  const tokenContractAddress = CONTRACT_ADDRESS
  const tokenContractABI = CONTRACT_ABI

  // Amount of tokens to transfer
  const amount = ethers.parseEther('10')

  try {
    // Connect wallet using sender's private key
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider)

    // Load the token contract
    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, senderWallet)

    // Transfer tokens
    const transferTx = await tokenContract.transferFrom(
      senderWallet.address,
      recipientAddress,
      amount
    )
    await transferTx.wait()

    console.log('Tokens transferred successfully!')
  } catch (error) {
    console.error('Error transferring tokens:', error)
  }
}

transferTokens()

// async function buyTagToken() {
//   // Set up Ethereum provider
//   const provider = new JsonRpcProvider('http://127.0.0.1:7545')
//   const clientPrivateKey = 'e22a03dfd91e8fb477c61607a2089ed2a1ea468f5c13464380be8c53986819b6'

//   const tagTokenContractAddress = CONTRACT_ADDRESS
//   const tagTokenContractABI = CONTRACT_ABI

//   // Amount of ETH to send
//   // const ethAmount = ethers.parseEther('10')
//   const ethAmount = ethers.parseEther('10')
//   // const ethAmount = 5_000_000_000_000_000_000

//   try {
//     // Connect wallet using client's private key
//     const clientWallet = new ethers.Wallet(clientPrivateKey, provider)

//     // Load the TagToken contract
//     const tagTokenContract = new ethers.Contract(
//       tagTokenContractAddress,
//       tagTokenContractABI,
//       clientWallet
//     )

//     const exchangeRate = await tagTokenContract.getExchangeRate()
//     const tagTokenAmount = ethAmount.mul(exchangeRate)

//     const approveTx = await clientWallet.sendTransaction({
//       to: tagTokenContractAddress,
//       value: ethAmount
//     })
//     await approveTx.wait()

//     // Buy TagToken by paying with ETH
//     const buyTx = await tagTokenContract.buyTagToken(tagTokenAmount)
//     await buyTx.wait()

//     console.log('TagToken purchased successfully!')
//   } catch (error) {
//     console.error('Error buying TagToken:', error)
//   }
// }

// buyTagToken()
