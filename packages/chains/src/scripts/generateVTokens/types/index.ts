import type { Address } from 'viem';

import type { ChainId } from '../../../types';

export interface TokenFile {
  vTokenAddresses: Address[];
  tokenFileName: string;
  chainId: ChainId;
}

export interface LegacyPoolConfig {
  venusLensContractAddress: Address;
  unitrollerContractAddress: Address;
  /** When true, use comptroller.getAllMarkets() instead of VenusLens (e.g. pre-release lens ABI mismatch) */
  useComptrollerGetAllMarkets?: boolean;
}

export interface IsolatedPoolConfig {
  poolLensContractAddress: Address;
  poolRegistryContractAddress: Address;
}

export type PoolConfig = {
  configs: Array<LegacyPoolConfig | IsolatedPoolConfig>;
  tokenFileName: string;
  chainId: ChainId;
};
