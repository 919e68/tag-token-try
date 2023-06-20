const { providers } = require('ethers')

const getBalance = async (walletAddress) => {
  try {
    console.log(providers)
    // const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, [], provider)
    // const balance = await contract.balanceOf(walletAddress)

    // console.log('Balance:', balance.toString())
  } catch (error) {
    console.error('Error:', error)
  }
}

module.exports = {
  getBalance
}
