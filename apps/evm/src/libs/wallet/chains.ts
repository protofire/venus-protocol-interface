import { ChainId, MainnetChainId, TestnetChainId, viemChains } from '@venusprotocol/chains';
import type { Chain } from 'viem';

import localConfig from 'config';
import { extractEnumValues } from 'utilities/extractEnumValues';

const getSupportedChains = () => {
  const chainIds =
    localConfig.network === 'testnet'
      // ? extractEnumValues(TestnetChainId)
      ? [ChainId.BSC_TESTNET]  // TODO: Remove this once we have a proper testnet support
      : extractEnumValues(MainnetChainId);

  const chains: Chain[] = chainIds.map(chainId => viemChains[chainId]);

  return chains;
};

export const governanceChainId =
  localConfig.network === 'testnet' ? ChainId.BSC_TESTNET : ChainId.BSC_MAINNET;

export const chains = getSupportedChains();

export const defaultChain = chains[0];
