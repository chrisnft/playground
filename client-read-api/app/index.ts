import { providers, utils, BigNumber } from "ethers"
import { mockAccounts } from './mock'
// Get .env data
import dotenv from 'dotenv'
const resultDotenv = dotenv.config({ path: './.env' })
if (resultDotenv.error) { throw resultDotenv.error }

/*
	EtherscanProvider queries
	An API Provider is a web api service that allowas access to the Ethereum blockchain
	(i.e, etherscan.io, infura.io, alchemy.com,...)
*/

export const queries = async (provider: providers.EtherscanProvider) => {
	// Block Queries
	const etherPrice = await provider.getEtherPrice()
	const blockNum: number = await provider.getBlockNumber() // Query current block number
	const block: providers.Block = await provider.getBlock(blockNum) // Query current block
	const gasUsed: BigNumber = block.gasUsed
	const resultFormatGasUsed = utils.formatEther(gasUsed)

	// Resolver queries
	const ensAddr = "vitalik.eth" // Vitalik Buterin's ENS address
	const accountAddr: string = await provider.resolveName(ensAddr) // Query the address for 'vitalik.eth'
	const resultReverseLookup = await provider.lookupAddress(accountAddr) // Reverse lookup, should be same as ensAddr

	return [{ etherPrice, blockNum, resultFormatGasUsed }, { accountAddr, resultReverseLookup }]
}

const main = async () => {
	// Ethereum network
	const network = 'mainnet'
	// Web api options
	const options = {
		alchemy: null, // Alchemy api token
		etherscan: process.env.ETHERSCAN_KEY, // Etherscan api token
		infura: null, // Infura project id
		packet: null, // Pocket application id
		quorum: null, // The number of backends that must agree
	}

	// Provider for the etherscan.io api a type 'EtherscanProvider'
	const etherscanProvider: providers.EtherscanProvider = new providers.EtherscanProvider(network, options.etherscan)
	return queries(etherscanProvider)
}

main()
	.then(v => console.log(v))
	.catch(e => console.log(e))

/*
[
	{
		etherPrice: 3779.94,
		blockNum: 13438064,
		resultFormatGasUsed: '0.000000000015258056'
	},
	{
		accountAddr: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
		resultReverseLookup: 'vitalik.eth'
	}
]
*/
