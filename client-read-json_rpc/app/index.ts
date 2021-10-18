import { providers, utils, BigNumber } from "ethers"

export const queries = async (provider: providers.Provider, accounts: string[]): Promise<Array<any>> => {
	// Block Queries
	const blockNum: number = await provider.getBlockNumber() // Query current block number
	const block: providers.Block = await provider.getBlock(blockNum) // Query current block
	const gasUsed: BigNumber = block.gasUsed // Get value of property 'gasUsed' for the total amount of transactions in block

	// Account Queries
	const addressToaccountAtIndex1: string = accounts[1] // Get account address at index 1
	const isAddr: boolean = utils.isAddress(addressToaccountAtIndex1) // Check if address is valid
	const balance: BigNumber = await provider.getBalance(addressToaccountAtIndex1) // Query balance of account at index 1

	return [{ blockNum, block, gasUsed }, { accounts, addressToaccountAtIndex1, isAddr, balance }]
}

const main = async () => {
	// Local dev/testing blockchian node
	const localNetwork = "http://playground-network:8545"

	// Connect
	const jsonRpcProvider: providers.JsonRpcProvider = new providers.JsonRpcProvider(localNetwork)

	// Query JsonRpcProvider for list of accounts
	const accounts: string[] = await jsonRpcProvider.listAccounts()

	// Call Provider query methods
	return await queries(jsonRpcProvider, accounts)
}

main()
	.then(v => console.log(v))
	.catch(e => console.log(e))

/*
[
	{
		blockNum: 0,
		block: {
			hash: '0xe75b305da780fbce27a451a35cd92b4560e55294a7894c0ab1499d3cc638737a',
			parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
			number: 0,
			timestamp: 1634400879,
			nonce: '0x0000000000000042',
			difficulty: 1,
			gasLimit: [BigNumber],
			gasUsed: [BigNumber],
			miner: '0x0000000000000000000000000000000000000000',
			extraData: '0x1234',
			transactions: [],
			baseFeePerGas: [BigNumber]
		},
		gasUsed: BigNumber { _hex: '0x00', _isBigNumber: true }
	},
	{
		accounts: [
			'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
			'0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
			'0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
			'0x90F79bf6EB2c4f870365E785982E1f101E93b906',
			'0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
			'0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
			'0x976EA74026E726554dB657fA54763abd0C3a0aa9',
			'0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
			'0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
			'0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
			'0xBcd4042DE499D14e55001CcbB24a551F3b954096',
			'0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
			'0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',
			'0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec',
			'0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
			'0xcd3B766CCDd6AE721141F452C550Ca635964ce71',
			'0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
			'0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
			'0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
			'0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
		],
		addressToaccountAtIndex1: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
		isAddr: true,
		balance: BigNumber { _hex: '0x021e19e0c9bab2400000', _isBigNumber: true }
	}
]
*/
