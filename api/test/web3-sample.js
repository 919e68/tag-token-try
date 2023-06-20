const Web3 = require('web3')

const providerUrl = 'http://127.0.0.1:7545'
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))

const contractAddress = '0x6aCB3AD3ae6E76d72Bc0746615D709Bc3aD3dD49'

web3.eth.getBalance(contractAddress, (error, balance) => {
  if (error) {
    console.error(error)
  } else {
    console.log(
      `Balance of contract ${contractAddress}: ${web3.utils.fromWei(balance, 'ether')} ETH`
    )
  }
})
