#!/usr/bin/env tsx
// BSC-only fork: Only importing BSC chain deployments
import isolatedPoolsBscMainnetDeployments from '@venusprotocol/isolated-pools/deployments/bscmainnet_addresses.json';
import isolatedPoolsBscTestnetDeployments from '@venusprotocol/isolated-pools/deployments/bsctestnet_addresses.json';
import venusProtocolBscMainnetDeployments from '@venusprotocol/venus-protocol/deployments/bscmainnet_addresses.json';
// FIXME: Temporary Fix - use custom deployments for fork (avoid patching node_modules)
// import venusProtocolBscTestnetDeployments from '@venusprotocol/venus-protocol/deployments/bsctestnet_addresses.json';
import venusProtocolBscTestnetDeployments from '../../../../../deployments/bsctestnet_addresses.json';
import type { Address } from 'viem';

import { ChainId } from '../../types';
import { getVTokenAddresses } from './getVTokenAddresses';
import type { PoolConfig, TokenFile } from './types';
import { writeBarrelFile } from './writeBarrelFile';
import { writeVTokens } from './writeVTokens';

// Optional override for BSC Testnet Core Pool (e.g. pre-release/fork with different comptroller + lens)
const bscTestnetCorePoolConfig =
  process.env.BSC_TESTNET_CORE_LENS && process.env.BSC_TESTNET_CORE_COMPTROLLER
    ? [
        {
          venusLensContractAddress: process.env.BSC_TESTNET_CORE_LENS as Address,
          unitrollerContractAddress: process.env.BSC_TESTNET_CORE_COMPTROLLER as Address,
          useComptrollerGetAllMarkets: true,
        },
      ]
    : [
        {
          venusLensContractAddress: venusProtocolBscTestnetDeployments.addresses.VenusLens as Address,
          unitrollerContractAddress: venusProtocolBscTestnetDeployments.addresses
            .Unitroller_Proxy as Address,
        },
      ];

// BSC-only fork: Only BSC mainnet and testnet configurations
const poolConfigs: PoolConfig[] = [
  {
    configs: [
      {
        venusLensContractAddress: venusProtocolBscMainnetDeployments.addresses.VenusLens as Address,
        unitrollerContractAddress: venusProtocolBscMainnetDeployments.addresses
          .Unitroller_Proxy as Address,
      },
      {
        poolLensContractAddress: isolatedPoolsBscMainnetDeployments.addresses.PoolLens as Address,
        poolRegistryContractAddress: isolatedPoolsBscMainnetDeployments.addresses
          .PoolRegistry as Address,
      },
    ],
    tokenFileName: 'bscMainnet',
    chainId: ChainId.BSC_MAINNET,
  },
  {
    configs: [
      ...bscTestnetCorePoolConfig,
      {
        poolLensContractAddress: isolatedPoolsBscTestnetDeployments.addresses.PoolLens as Address,
        poolRegistryContractAddress: isolatedPoolsBscTestnetDeployments.addresses
          .PoolRegistry as Address,
      },
    ],
    tokenFileName: 'bscTestnet',
    chainId: ChainId.BSC_TESTNET,
  },
];

const generateVTokens = async () => {
  // Fetch vToken addresses on all chains
  const vTokenAddresses = await Promise.all(
    poolConfigs.map(poolConfig => getVTokenAddresses({ poolConfig })),
  );

  const tokenFiles: TokenFile[] = poolConfigs.map((config, i) => ({
    vTokenAddresses: vTokenAddresses[i].vTokenAddresses,
    tokenFileName: config.tokenFileName,
    chainId: config.chainId,
  }));

  // Generate individual chain token lists
  await Promise.all(
    tokenFiles.map(tokenFile =>
      writeVTokens({
        vTokenAddresses: tokenFile.vTokenAddresses,
        chainId: tokenFile.chainId,
        outputFileName: tokenFile.tokenFileName,
      }),
    ),
  );

  // Generate barrel file
  writeBarrelFile({
    tokenFiles,
  });
};

console.log('Generating VToken records...');

generateVTokens()
  .then(() => console.log('Finished generating VToken records'))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
