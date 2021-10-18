import { providers, getDefaultProvider, utils, BigNumber } from "ethers"
import { mockAccounts } from './mock'
// Get .env data
import dotenv from 'dotenv'
const resultDotenv = dotenv.config({ path: './.env' })
if (resultDotenv.error) { throw resultDotenv.error }

export const queries = async (provider: providers.Provider, addr: string): Promise<Array<any>> => {
	// Block queries
	const currentBlockNumber: number = await provider.getBlockNumber() // Query current block number from network
	const block: providers.Block = await provider.getBlock(currentBlockNumber) // Get block data from network
	const gasUsed: BigNumber = block.gasUsed // Get a property like 'gasUsed' for the toatal number of transactions in block

	// Account queries
	const isAddr: boolean = utils.isAddress(addr) // Check if address is valid
	const balance: BigNumber = await provider.getBalance(addr) // Query balance of an account
	const trxCount: number = await provider.getTransactionCount(addr) // Query total transactions of account
	const balanceAsString: string = utils.formatEther(balance) // Convert BigNumer to string
	const wei: BigNumber = utils.parseEther(balanceAsString) // Convert string to Wei (BigNumber)

	return [{ currentBlockNumber, gasUsed }, { isAddr, balance, trxCount, balanceAsString, wei }]
}

const main = async () => {
	// local dev/testing blockchian 
	const localNetwork = "http://playground-network:8545"
	// Web api options
	const options = {
		alchemy: null, // Alchemy api token
		etherscan: process.env.ETHERSCAN_KEY, // Etherscan api token
		infura: null, // Infura project id
		packet: null, // Pocket application id
		quorum: null, // The number of backends that must agree
	}

	const mockLookupAddr: string = mockAccounts[1].address // Mock data address 

	// Call getDefaultProvider for safe, readonly methods 
	const defaultProvider = getDefaultProvider(localNetwork, options)

	return await queries(defaultProvider, mockLookupAddr)
}

main()
	.then(v => console.log(v))
	.catch(e => console.log(e))

/*
[
	{
		currentBlockNumber: 0,
		gasUsed: BigNumber { _hex: '0x00', _isBigNumber: true }
	},
	{
		isAddr: true,
		balance: BigNumber { _hex: '0x021e19e0c9bab2400000', _isBigNumber: true },
		trxCount: 0,
		balanceAsString: '10000.0',
		wei: BigNumber { _hex: '0x021e19e0c9bab2400000', _isBigNumber: true }
	}
]
*/
