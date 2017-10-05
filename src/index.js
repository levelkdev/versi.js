import truffleContract from 'truffle-contract'
import truffleExt from 'truffle-ext'
import versiContracts from 'versi-contracts'
import exchangeProvider from './exchangeProvider'
import poolProvider from './poolProvider'
import riskyBusinessProvider from './riskyBusinessProvider'

export const VersiProvider = (web3Provider, web3, contractDefaults) => {
  // const Versi = getContract(versiContracts.Versi)
  const TokenExchange = getContract(versiContracts.TokenExchange)
  const VersiExchangableToken = getContract(versiContracts.VersiExchangableToken)
  const VersiPool = getContract(versiContracts.VersiPool)
  const RiskyBusiness = getContract(versiContracts.RiskyBusiness)

  function getContract (contractAbi) {
    const { requireContract } = truffleExt(web3)
    return requireContract(getTruffleContract(contractAbi))
  }

  function getTruffleContract (contractAbi) {
    const contract = truffleContract(contractAbi)
    contract.setProvider(web3Provider)
    if (contractDefaults) {
      contract.defaults(contractDefaults)
    }
    return contract
  }

  return {
    exchange: exchangeProvider(web3, TokenExchange, VersiExchangableToken),
    pool: poolProvider(web3, VersiPool),
    riskyBusiness: riskyBusinessProvider(web3, RiskyBusiness, VersiExchangableToken)
  }
}
