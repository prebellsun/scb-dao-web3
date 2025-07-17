// src/utils/ethers-wagmi-utils.ts

// 변경 전: import { PublicClient, WalletClient, getAddress } from 'viem';
// 변경 후:
import { getAddress } from 'viem';
import type { PublicClient, WalletClient } from 'viem'; // 타입으로만 사용되므로 'type' 키워드 추가
import { providers } from 'ethers';

// 나머지 코드는 이전과 동일하게 유지됩니다.

/**
 * Viem의 PublicClient를 Ethers v5의 JsonRpcProvider로 변환합니다.
 * PublicClient의 체인 정보에서 RPC URL을 추출합니다.
 */
export function publicClientToProvider(publicClient: PublicClient) {
  // PublicClient에 체인 정보가 유효한지 확인합니다.
  if (!publicClient.chain) {
    throw new Error('PublicClient의 체인 정보가 정의되지 않았습니다.');
  }
  // 기본 HTTP RPC URL이 존재하는지 확인합니다.
  if (!publicClient.chain.rpcUrls?.default?.http?.[0]) {
    throw new Error('PublicClient의 기본 HTTP RPC URL이 정의되지 않았습니다.');
  }

  const rpcUrl = publicClient.chain.rpcUrls.default.http[0];

  return new providers.JsonRpcProvider(rpcUrl, {
    chainId: publicClient.chain.id,
    name: publicClient.chain.name,
  });
}

/**
 * Viem의 WalletClient를 Ethers v5의 Signer로 변환합니다.
 * WalletClient의 transport를 EIP-1193 호환 provider로 직접 사용합니다.
 */
export function walletClientToSigner(walletClient: WalletClient) {
  // WalletClient에 계정과 체인 정보가 유효한지 확인합니다.
  if (!walletClient.account || !walletClient.chain) {
    throw new Error('WalletClient의 계정 또는 체인 정보가 정의되지 않았습니다.');
  }

  // ethers.providers.Web3Provider는 EIP-1193 호환 Provider를 인자로 받습니다.
  // Viem의 WalletClient.transport는 이 인터페이스를 구현합니다.
  const provider = new providers.Web3Provider(walletClient.transport as providers.ExternalProvider);

  // 연결된 계정의 Signer를 가져옵니다.
  const signer = provider.getSigner(getAddress(walletClient.account.address));
  return signer;
}