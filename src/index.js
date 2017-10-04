import truffleContract from 'truffle-contract'
import truffleExt from 'truffle-ext'
import versiContracts from 'versi-contracts'

export default class Versi {
  constructor (web3Provider, web3, contractDefaults) {
    this.web3Provider = web3Provider
    this.web3 = web3
    this.contractDefaults = contractDefaults

    this.Versi = this.getContract(versiContracts.Versi)
    this.TokenExchange = this.getContract(versiContracts.TokenExchange)
    this.VersiExchangableToken = this.getContract(versiContracts.VersiExchangableToken)
    this.VersiPool = this.getContract(versiContracts.VersiPool)
  }

  async buyVersiEther (value, account) {
    const tokenExchange = await this.TokenExchange.deployed()
    const weiValue = this.toWei(value)
    let params = { value: weiValue }
    if (account) params.from = account
    const tx = await tokenExchange.buy(params)
    return tx
  }

  async sellVersiEther (value, account) {
    const tokenExchange = await this.TokenExchange.deployed()
    const weiValue = this.toWei(value)
    let params
    if (account) params = { from: account }
    const tx = await tokenExchange.sell(weiValue, params)
    return tx
  }

  async versiEtherBalance (account) {
    const versiExchangableToken = await this.VersiExchangableToken.deployed()
    const balance = await versiExchangableToken.balanceOf(account)
    const ethBalance = this.toEth(balance.toNumber())
    return ethBalance
  }

  async poolValue () {
    const versiPool = await this.VersiPool.deployed()
    const weiVal = this.web3.eth.getBalance(versiPool.address)
    const ethVal = this.toEth(weiVal.toNumber())
    return ethVal
  }

  getTruffleContract (contractAbi) {
    const contract = truffleContract(contractAbi)
    contract.setProvider(this.web3Provider)
    if (this.contractDefaults) {
      contract.defaults(this.contractDefaults)
    }
    return contract
  }

  getContract (contractAbi) {
    const { requireContract } = truffleExt(this.web3)
    return requireContract(this.getTruffleContract(contractAbi))
  }

  toWei (amount) {
    return this.web3.toWei(amount, 'ether')
  }

  toEth (amount) {
    return this.web3.fromWei(amount, 'ether')
  }
}
