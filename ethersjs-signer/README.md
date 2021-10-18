# Ethersjs Signer

This is an experimental exercise for ethersjs and the Signer abstraction.

A Signer in ethers is an abstraction of an Ethereum Account.
It's mainly used for siging messages, transactions, and sending transactions to the ethereum network.
The most common signers are Wallet and JsonRpcSigner.

##	Terminology

| Provider | Abstraction for a connection that has only read-only access. |
| Signer | Abstraction for a connection that directly or indirectly has access to a private key, which can sign messages and transactions. |
| Contract | Abstraction for connection that has a connection to a contract. |
