import utilsProvider from './utilsProvider'

export default (web3, RiskyBusiness, VersiExchangableToken) => {
  const utils = utilsProvider(web3)
  let rskBusInstances = {}

  function riskyBusinessProvider (riskyBusinessInstance) {
    async function approveTokenTransfer (spender, value, approver) {
      const weiValue = utils.toWei(value)
      let params = {}
      if (approver) params.from = approver
      const vsiEthToken = await VersiExchangableToken.deployed()
      const tx = await vsiEthToken.approve(spender, weiValue, params)
      return tx
    }

    return {
      issuePolicy: async (value, account) => {
        await approveTokenTransfer(riskyBusinessInstance.address, value, account)
        const weiValue = utils.toWei(value)
        let params = {}
        if (account) params.from = account
        const tx = await riskyBusinessInstance.issuePolicy(weiValue, params)
        return tx
      }
    }
  }

  return {
    new: async () => {
      const vsiEthToken = await VersiExchangableToken.deployed()
      const rskBus = await RiskyBusiness.new(vsiEthToken.address)
      rskBusInstances[rskBus.address] = rskBus
      return rskBus
    },
    at: (address) => {
      return riskyBusinessProvider(rskBusInstances[address])
    }
  }
}
