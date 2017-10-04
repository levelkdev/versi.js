import utilsProvider from './utilsProvider'

export default (web3, TokenExchange, VersiExchangableToken) => {
  const utils = utilsProvider(web3)

  return {
    buyVersiEther: async (value, account) => {
      const tokenExchange = await TokenExchange.deployed()
      const weiValue = utils.toWei(value)
      let params = { value: weiValue }
      if (account) params.from = account
      const tx = await tokenExchange.buy(params)
      return tx
    },

    sellVersiEther: async (value, account) => {
      const tokenExchange = await TokenExchange.deployed()
      const weiValue = utils.toWei(value)
      let params
      if (account) params = { from: account }
      const tx = await tokenExchange.sell(weiValue, params)
      return tx
    },

    versiEtherBalance: async (account) => {
      const versiExchangableToken = await VersiExchangableToken.deployed()
      const balance = await versiExchangableToken.balanceOf(account)
      const ethBalance = utils.toEth(balance.toNumber())
      return ethBalance
    }
  }
}
