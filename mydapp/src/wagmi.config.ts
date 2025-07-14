// src/wagmi.config.ts
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { createPublicClient, createWalletClient } from "viem";
import { injected } from "wagmi/connectors";

const WEB3_PROVIDER = "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(WEB3_PROVIDER),
  },
});

// 👉 여기가 중요: useAragonClient에서 직접 불러다 쓸 수 있게 export
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(WEB3_PROVIDER),
});

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(WEB3_PROVIDER),
});
