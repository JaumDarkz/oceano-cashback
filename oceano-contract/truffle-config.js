const HDWalletProvider = require("@truffle/hdwallet-provider");

require('dotenv').config();
const privateKeys = [ process.env.MASTER_PRIVATE_KEY ];

module.exports = {

  networks: {
    mumbai: {
      provider: () => new HDWalletProvider({
        privateKeys: privateKeys,
        providerOrUrl: process.env.RPC_URL_MUMBAI,

      }),
      network_id: 80001,
      gas: 8000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true // If in testnet, use true, otherwise use false.
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  plugins: ["truffle-plugin-verify"],
  api_keys : {
    polygonscan: process.env.POLYSCAN_API_KEY
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  },

};
