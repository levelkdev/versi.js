export default (web3) => {
  return {
    toWei: (amount) => {
      return web3.toWei(amount, 'ether')
    },
    toEth: (amount) => {
      return web3.fromWei(amount, 'ether')
    }
  }
}
