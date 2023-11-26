import { HardhatUserConfig } from 'hardhat/config';
import { config as LoadEnv } from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import { NetworkUserConfig } from 'hardhat/types';

import * as dotenv from 'dotenv';
dotenv.config();

LoadEnv();

/*function getTestnetChainConfig(): NetworkUserConfig {
  const config: NetworkUserConfig = {
    url: 'https://rpc.testnet.lukso.network',
    chainId: 4201,
  };

  if (process.env.PRIVATE_KEY !== undefined) {
    config['accounts'] = [process.env.PRIVATE_KEY];
  }

  return config;
  
}

*/
/*
const config: HardhatUserConfig = {
  solidity: {
    version:'0.8.9',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
},
  networks: {
    luksoTestnet: {
      url: 'https://rpc.testnet.lukso.network',
      chainId: 4201,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};
*/
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    luksoTestnet: {
      url: 'https://rpc.testnet.lukso.network',
      chainId: 4201,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
