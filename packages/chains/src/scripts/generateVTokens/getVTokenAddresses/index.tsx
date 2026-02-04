import type { Address } from 'viem';

import { createPublicClient } from '../../../utilities/createPublicClient';
import type { PoolConfig } from '../types';
import { abi as poolLensAbi } from './poolLensAbi';
import { abi as venusLensAbi } from './venusLensAbi';

const comptrollerGetAllMarketsAbi = [
  {
    inputs: [],
    name: 'getAllMarkets',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const getVTokenAddresses = async ({ poolConfig }: { poolConfig: PoolConfig }) => {
  const publicClient = createPublicClient({ chainId: poolConfig.chainId });

  const contracts = poolConfig.configs.map(config => {
    if ('venusLensContractAddress' in config) {
      if (config.useComptrollerGetAllMarkets) {
        return {
          address: config.unitrollerContractAddress,
          abi: comptrollerGetAllMarketsAbi,
          functionName: 'getAllMarkets' as const,
          args: [] as const,
        };
      }
      return {
        address: config.venusLensContractAddress,
        abi: venusLensAbi,
        functionName: 'getAllPoolsData' as const,
        args: [config.unitrollerContractAddress] as const,
      };
    }
    return {
      address: config.poolLensContractAddress,
      abi: poolLensAbi,
      functionName: 'getAllPools' as const,
      args: [config.poolRegistryContractAddress] as const,
    };
  });

  const results = await publicClient.multicall({
    contracts,
    allowFailure: false,
  });

  const vTokenAddresses: Address[] = [];

  results.forEach((result, i) => {
    if (!result) {
      return;
    }
    const config = poolConfig.configs[i];
    const useComptroller =
      'venusLensContractAddress' in config && config.useComptrollerGetAllMarkets;

    if (useComptroller && Array.isArray(result)) {
      vTokenAddresses.push(...(result as Address[]));
      return;
    }

    vTokenAddresses.push(
      ...result.flatMap(r =>
        ('markets' in r ? r.markets : r.vTokens).reduce<Address[]>(
          (acc, m) => (m.isListed ? [...acc, m.vToken] : acc),
          [],
        ),
      ),
    );
  });

  return { vTokenAddresses };
};
