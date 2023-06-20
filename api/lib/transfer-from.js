const { ethers, JsonRpcProvider } = require('ethers')
const TagToken = require('../TagToken.json')

const RPC_PROVIDER = process.env.RPC_PROVIDER
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const CONTRACT_ABI = TagToken.abi

const MAIN_OWNERS = [
  {
    name: 'Main 01',
    private: '85409d8b27a0ae3880fd1e1dd6562714b9ced0030146138915c2bc91e3d660a4'
  },
  {
    name: 'Main 02',
    private: '631b7ef2de000f7883e8823e67cc7a4b636c386fe930d421dcf535487644d358'
  },
  {
    name: 'Main 03',
    private: 'c0fd278a3162053b2944ef7aca6f9a7b5e1c3b5f480ad82792f9b3ce7585360f'
  },
  {
    name: 'Main 04',
    private: 'e10a2e808b18d7a079abda4eb8cd987dc82b581c813688133c2a7a147a054e03'
  },
  {
    name: 'Main 05',
    private: 'f6b1c5dda80d96406d94ae0861273d6433a3c9064c1ebde5c58dde651e477684'
  }
]

const transferFrom = async (ownerIndex, recipientAddress, amount) => {
  const provider = new JsonRpcProvider(RPC_PROVIDER)
  const senderPrivateKey = MAIN_OWNERS[ownerIndex].private

  try {
    const transactionAmount = ethers.parseEther(amount.toString())
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider)
    const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, senderWallet)

    // const SPENDER = '0x6d9b77b36e4c8f0d5c589070ff715bcaaf3abdf9'
    // const approveTx = await tokenContract.approve(SPENDER, transactionAmount)
    // console.log('logger:approveTx', approveTx)

    // const transferTx = await tokenContract.transferFrom(
    //   senderWallet.address,
    //   recipientAddress,
    //   transactionAmount
    // )

    // using transfer
    const transferTx = await tokenContract.transfer(recipientAddress, transactionAmount)
    const result = await transferTx.wait()
    return result.hash
  } catch (error) {
    console.error('Error transferring tokens:', error)
    return false
  }
}

module.exports = {
  transferFrom
}
