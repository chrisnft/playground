import { providers, getDefaultProvider, utils, BigNumber } from "ethers"
import { mockAccounts } from './mock'
// Get .env data
import dotenv from 'dotenv'
const resultDotenv = dotenv.config({ path: './.env' })
if (resultDotenv.error) { throw resultDotenv.error }

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


	// ENS is the Ethereum Naming Service which is a name that refers to an ethereum address (https://docs.ethers.io/v5/api/utils/address/#address)
	// Resolver methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--ens-methods)
	// Resolver's main use case is resolving and working with ENS names
	const ensAddr = "vitalik.eth" // Vitalik Buterin's ENS address

	// Provider instance for etherscan.io api
	const etherscanProvider: providers.EtherscanProvider = new providers.EtherscanProvider(network, options.etherscan)

	// Get Resolver from Provider
	const resolver: providers.Resolver = await etherscanProvider.getResolver(ensAddr)

	// Do things with resovler

	const address = resolver.address // Get address
	const name = resolver.name // Get name

	// Wait a second because you only get 5 calls per second for a free account on etherscan.io
	await new Promise(r => setTimeout(r, 2000));

	const contentHash = await resolver.getContentHash() // Stored EIP-1577 content hash
	const emailTextEntry = await resolver.getText("email") // Resolve text entry for key 'email'
	const urlTextEntry = await resolver.getText("url") // Resolve text entry for key 'url'
	const twitterTextEntry = await resolver.getText("com.twitter") // Resolve text enrty for key 'com.twitter'

	return [{ name, address }, { contentHash, emailTextEntry, urlTextEntry, twitterTextEntry }]
}

main()
	.then(v => console.log(v))
	.catch(e => console.log(e))


/*
[
	{
		name: 'vitalik.eth',
		address: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
	},
	{
		contentHash: 'ipfs://QmWorKQ7DW6aaWCju6whiXr2SA4WfVqzZRy7aju63XaNJv',
		emailTextEntry: null,
		urlTextEntry: 'https://vitalik.ca',
		twitterTextEntry: null
	}
]
*/
