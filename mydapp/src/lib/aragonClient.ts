import { getSdk, SdkOptions } from '@aragon/sdk-client';
import { Wallet } from 'ethers';

const options: SdkOptions = {
  daoConfig: {
    chainId: 11155111, // Sepolia 테스트넷
    daoAddress: '0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081',
  },
};

export const aragonClient = getSdk(options);
