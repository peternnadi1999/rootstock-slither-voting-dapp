require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
	solidity: "0.8.28",
	settings: {
		optimizer: {
			enabled: true,
			runs: 200,
		},
	},
	networks: {
		// for testnet
		rskTestnet: {
			url: process.env.ROOTSTOCK_TESTNET_RPC_URL,
			chainId: 31,
			verbose: true,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
	gasReporter: {
		enabled: true,
		currency: "USD",
		token: "RBTC",
		tokenPrice: 104820, // Manually set based on Rootstock Explorer (update with current RBTC price)
		gasPrice: 0.0237, // Manually set based on Rootstock Explorer
		coinmarketcap: null, // Not using CoinMarketCap API
		currencyDisplayPrecision: 6,
		offline: true, // Use manual settings
		showMethodSig: true,
		showTimeSpent: true,
	},
};
