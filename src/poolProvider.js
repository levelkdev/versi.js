import utilsProvider from './utilsProvider'

export default (web3, VersiPool) => {
  const utils = utilsProvider(web3)

  return {
    value: async () => {
      const versiPool = await VersiPool.deployed()
      const weiVal = web3.eth.getBalance(versiPool.address)
      const ethVal = utils.toEth(weiVal.toNumber())
      return ethVal
    }
  }
}
