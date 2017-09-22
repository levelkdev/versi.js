import truffleContract from 'truffle-contract'
import truffleExt from 'truffle-ext'
import versiContracts from 'versi-contracts'

export default class Versi {
  constructor (web3Provider, web3, contractDefaults) {
    this.web3Provider = web3Provider
    this.web3 = web3
    this.contractDefaults = contractDefaults
    const { requireContract } = truffleExt(web3)
    this.Versi = requireContract(this.getTruffleContract(versiContracts.Versi))
  }

  async issueVersiEtherToken () {
    const versi = await this.Versi.deployed()
    const tx = await versi.issueVersiEtherToken()
    return tx
  }

  getTruffleContract (contractAbi) {
    const contract = truffleContract(contractAbi)
    contract.setProvider(this.web3Provider)
    if (this.contractDefaults) {
      contract.defaults(this.contractDefaults)
    }
    return contract
  }
}
