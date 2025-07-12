import { Client } from '@aragon/sdk-client';
import { useAccount, useSigner } from 'wagmi';

export const getAragonClient = (signer: any) => {
  return new Client({
    network: 'sepolia',
    signer,  // 여기서 signer를 직접 넘김
  });
};














