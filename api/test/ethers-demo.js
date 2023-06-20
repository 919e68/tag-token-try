const { ethers, JsonRpcProvider } = require('ethers')
const TagTokenJson = require('../TagToken.json')

const PROVIDER_URL = 'http://127.0.0.1:7545'
const TOKEN_ABI = TagTokenJson.abi
const CONTRACT_TOKEN = '0xB7Df532f39004537761ff191520Af0eAC01df3B0'

class TagToken {
  static instance = null

  constructor(providerUrl, tokenABI, contractToken) {
    if (TagToken.instance) {
      return TagToken.instance
    }

    this.providerUrl = providerUrl
    this.tokenABI = tokenABI
    this.contractToken = contractToken

    this.provider = ethers.getDefaultProvider(providerUrl)
    this.contract = new ethers.Contract(contractToken, tokenABI, this.provider)

    TagToken.instance = this
  }

  static async getName() {
    return TagToken.instance.contract.name()
  }

  static async getSymbol() {
    return TagToken.instance.contract.symbol()
  }

  static async getBalance(walletAddress) {
    return TagToken.instance.contract.balanceOf(walletAddress)
  }

  static async transferFrom(senderPrivate, receiver, amount) {
    const senderWallet = new ethers.Wallet(senderPrivate, TagToken.instance.provider)

    const senderBalance = await TagToken.getBalance(senderWallet.address)
    console.log('senderBalance:', senderBalance)

    // Get the contract's signer
    // const contractWithSigner = TagToken.instance.contract.connect(senderWallet)

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, senderWallet)

    // Transfer funds from sender to recipient using the contract's transfer function
    const transferTransaction = await contractWithSigner.transfer(receiver, amount)
    console.log('Transfer transaction hash:', transferTransaction.hash)

    // const contractWithSigner = TagToken.instance.contract.connect(senderWallet)

    // const approved = await contractWithSigner.approve(receiver, amount)
    // console.log('Approval Transaction Hash:', approved.hash)

    // const approved = await contract.approve(receiver, amount)

    // console.log('logger::approval:', approved.hash)

    // const transferred = await contract.transferFrom(senderWallet.address, receiver, amount)

    // console.log('Transfer transaction:', transferred.hash)
  }
}

// const transferFrom = async (sendersPrivateKey, receiverAddress, amount) => {
//   try {
//     const provider = new ethers.providers.JsonRpcProvider(providerUrl)
//     const wallet = new ethers.Wallet(privateKey, provider)
//     const contract = new ethers.Contract(contractAddress, TagToken.abi, wallet)

//     const approved = await contract.approve(recipientAddress, amountToTransfer)
//     console.log('Approval transaction:', approved.hash)

//     const transferred = await contract.transferFrom(
//       wallet.address,
//       recipientAddress,
//       amountToTransfer
//     )
//     console.log('Transfer transaction:', transferred.hash)
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

const main = async () => {
  new TagToken(PROVIDER_URL, TOKEN_ABI, CONTRACT_TOKEN)

  // const name = await TagToken.getName()
  // const symbol = await TagToken.getSymbol()

  // console.log('logger::name:', name)
  // console.log('logger::symbol:', symbol)

  // const balance = await TagToken.getBalance('0x045556439CF898AA980E2Cc7EAfb822c7904377A')
  // console.log('logger::balance:', balance)

  const data = await TagToken.transferFrom(
    '85409d8b27a0ae3880fd1e1dd6562714b9ced0030146138915c2bc91e3d660a4',
    '0x26691872F6ad47bD662a803dF6c8924Fa14a487a',
    100
  )
}

main()
