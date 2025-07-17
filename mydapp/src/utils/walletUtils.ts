import { getWalletClient as wagmiGetWalletClient } from '@wagmi/core';
import type { WalletClient, PublicClient } from 'viem';

/**
 * 현재 연결된 지갑에서 WalletClient를 가져옴
 */
export const getWalletClient = async (): Promise<WalletClient | null> => {
  try {
    const walletClient = await wagmiGetWalletClient();
    return walletClient;
  } catch (err) {
    console.error('❌ WalletClient 가져오기 실패:', err);
    return null;
  }
};

/**
 * signer를 생성하여 Aragon SDK에 넘기기 위함
 */
export const getSigner = async (publicClient: PublicClient, walletClient: WalletClient) => {
  try {
    // walletClient.account이 없으면 getAddresses 호출
    const [account] = walletClient.account ? [walletClient.account] : await walletClient.getAddresses();

    if (!account) {
      throw new Error('연결된 지갑 주소를 찾을 수 없습니다.');
    }

    return {
      async getAddress() {
        return account;
      },
      async signMessage({ message }: { message: string }) {
        return walletClient.signMessage({ account, message });
      },
      async signTransaction(tx: any) {
        return walletClient.signTransaction({ ...tx, account });
      },
      async signTypedData(params: any) {
        return walletClient.signTypedData({ ...params, account });
      },
    };
  } catch (err) {
    console.error('❌ signer 생성 실패:', err);
    throw err;
  }
};





