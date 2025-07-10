// src/lib/aragonClient.ts
import { getSdk, Environment } from '@aragon/sdk-client';

export const aragonClient = getSdk({
  daoAddress: "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081",  // SCB DAO의 주소 입력
  environment: Environment.SEPOLIA,    // Sepolia 테스트넷
});
