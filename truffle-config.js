const HDWalletProvider = require("@truffle/hdwallet-provider");
const { mnemonic, BSCSCANAPIKEY } = require("./env.json");

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: BSCSCANAPIKEY,
  },
  networks: {
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      timeoutBlocks: 200,
      confirmations: 5,
      production: true, // Treats this network as if it was a public net. (default: false)
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 4,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true,
    },
  },
  mocha: {
    timeout: 100000,
  },
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
