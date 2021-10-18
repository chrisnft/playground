import { providers, getDefaultProvider, utils, BigNumber, Signer, Signature } from "ethers"
import { mockAccounts } from './mock'
// Get .env data
import dotenv from 'dotenv'
const resultDotenv = dotenv.config({ path: './.env' })
if (resultDotenv.error) { throw resultDotenv.error }

const main = async () => {
	// Local dev blockchian node address
	const localNetwork = "http://playground-network:8545"
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

	// Signer abstraction
	const jsonRpcProvider: providers.JsonRpcProvider = new providers.JsonRpcProvider(localNetwork)
	const jsonRpcSigner: providers.JsonRpcSigner = jsonRpcProvider.getSigner()

	// Get some info about signer (For the local network connection, the first index of the accounts is the signer)
	const resultGetSignerInfo = await getSignerInfo(jsonRpcSigner)

	// Wallet inherits Signer
	// await walletExercise()
	console.log(resultGetSignerInfo)
}

const getSignerInfo = async (signer: Signer) => {
	return {
		address: await signer.getAddress(),
		balance: await signer.getBalance(),
		balanceFormatted: utils.formatEther(await signer.getBalance())
	}
}

// const createTransaction = async (signer:Signer) => {
// 	const amount = utils.parseEther("1.0")
// 	const tx = {to:"",value:amount}
// 	signer.signTransaction(tx)
// }

// const walletExercise = async () => {
// }

main()
	.catch(e => console.log(e))
