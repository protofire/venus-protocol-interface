import { useChainId } from 'libs/wallet';
import { ChainId } from 'types';

export const featureFlags = {
  // DISABLED FOR FORK - Swap feature
  integratedSwap: [],
  // DISABLED FOR FORK - Prime feature
  prime: [],
  // DISABLED FOR FORK - Prime calculator
  primeCalculator: [],
  tusdMigrationWarning: [ChainId.BSC_MAINNET],
  trxMigrationWarning: [ChainId.BSC_MAINNET],
  sxpDisablingWarning: [ChainId.BSC_MAINNET],
  bethUpdateWarning: [ChainId.BSC_MAINNET],
  // DISABLED FOR FORK - VAI stablecoin route
  vaiRoute: [],
  // DISABLED FOR FORK - Swap route
  swapRoute: [],
  // DISABLED FOR FORK - Governance proposal creation
  createProposal: [],
  // DISABLED FOR FORK - Governance voting
  voteProposal: [],
  // DISABLED FOR FORK - Governance route (entire page)
  governanceRoute: [],
  // DISABLED FOR FORK - Vaults/XVS staking route
  vaultsRoute: [],
  apyCharts: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.ETHEREUM,
    // ChainId.SEPOLIA,
    // ChainId.OPBNB_MAINNET,
    // ChainId.OPBNB_TESTNET,
    // ChainId.ARBITRUM_ONE,
    // ChainId.ZKSYNC_SEPOLIA,
    // ChainId.ZKSYNC_MAINNET,
    // ChainId.OPTIMISM_MAINNET,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.BASE_MAINNET,
    // ChainId.BASE_SEPOLIA,
    // ChainId.UNICHAIN_MAINNET,
    // ChainId.UNICHAIN_SEPOLIA,
  ],
  marketParticipantCounts: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.OPBNB_MAINNET,
    // ChainId.ETHEREUM,
    // ChainId.SEPOLIA,
    // ChainId.ARBITRUM_ONE,
    // ChainId.ARBITRUM_SEPOLIA,
    // ChainId.ZKSYNC_SEPOLIA,
    // ChainId.ZKSYNC_MAINNET,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.OPTIMISM_MAINNET,
    // ChainId.BASE_MAINNET,
    // ChainId.BASE_SEPOLIA,
    // ChainId.UNICHAIN_MAINNET,
    // ChainId.UNICHAIN_SEPOLIA,
  ],
  // DISABLED FOR FORK - Bridge route
  bridgeRoute: [],
  wrapUnwrapNativeToken: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.ETHEREUM,
    // ChainId.SEPOLIA,
    // ChainId.OPBNB_MAINNET,
    // ChainId.OPBNB_TESTNET,
    // ChainId.ARBITRUM_SEPOLIA,
    // ChainId.ARBITRUM_ONE,
    // ChainId.ZKSYNC_SEPOLIA,
    // ChainId.ZKSYNC_MAINNET,
    // ChainId.OPTIMISM_MAINNET,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.BASE_MAINNET,
    // ChainId.BASE_SEPOLIA,
    // ChainId.UNICHAIN_MAINNET,
    // ChainId.UNICHAIN_SEPOLIA,
  ],
  gaslessTransactions: [ChainId.ZKSYNC_SEPOLIA, ChainId.ZKSYNC_MAINNET],
  web3DomainNames: [ChainId.BSC_MAINNET, ChainId.ETHEREUM, ChainId.ARBITRUM_ONE],
  burnedWBnbButton: [ChainId.BSC_MAINNET],
  importPositions: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.ETHEREUM,
    // ChainId.SEPOLIA,
    // ChainId.OPTIMISM_MAINNET,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.BASE_MAINNET,
    // ChainId.BASE_SEPOLIA,
  ],
  importAavePositions: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.ARBITRUM_ONE,
    // ChainId.ARBITRUM_SEPOLIA,
    // ChainId.ETHEREUM,
    // ChainId.SEPOLIA,
    // ChainId.OPTIMISM_MAINNET,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.ZKSYNC_MAINNET,
    // ChainId.ZKSYNC_SEPOLIA,
    // ChainId.BASE_MAINNET,
    // ChainId.BASE_SEPOLIA,
    // ChainId.UNICHAIN_MAINNET,
    // ChainId.UNICHAIN_SEPOLIA,
  ],
  eMode: [
    ChainId.BSC_MAINNET,
    ChainId.BSC_TESTNET,
    // ChainId.OPBNB_TESTNET,
    // ChainId.SEPOLIA,
    // ChainId.ARBITRUM_SEPOLIA,
    // ChainId.ZKSYNC_SEPOLIA,
    // ChainId.OPTIMISM_SEPOLIA,
    // ChainId.BASE_SEPOLIA,
    // ChainId.UNICHAIN_SEPOLIA,
  ],
  transactionHistory: [ChainId.BSC_MAINNET],
  leveragedPositions: [],
  repayWithCollateral: [],
};

export type FeatureFlag = keyof typeof featureFlags;

export interface UseIsFeatureEnabledInput {
  name: FeatureFlag;
}

export const useIsFeatureEnabled = ({ name }: UseIsFeatureEnabledInput) => {
  const { chainId } = useChainId();
  return featureFlags[name].includes(chainId);
};
