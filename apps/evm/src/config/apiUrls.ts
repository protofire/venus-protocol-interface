import type { Network } from 'types';

export const apiUrls: {
  [key in Network]: string;
} = {
  testnet: 'http://localhost:3001',
  mainnet: 'https://api.venus.io',
  'mainnet-preview': 'https://api-preview.venus.io',
};
