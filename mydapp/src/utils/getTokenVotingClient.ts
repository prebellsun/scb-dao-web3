// src/utils/getTokenVotingClient.ts

import { Client, TokenVotingClient, TokenVotingClientParams } from '@aragon/sdk-client';

export const getTokenVotingClient = (
  client: Client,
  tokenVotingPluginAddress: string | undefined
) => {
  if (!tokenVotingPluginAddress) {
    console.error('❌ Token Voting 플러그인 주소가 정의되지 않았습니다.');
    return null;
  }

  try {
    const tokenVotingParams: TokenVotingClientParams = {
      client,
      pluginAddress: tokenVotingPluginAddress,
    };

    // ✅ 이 줄 바로 아래에 console.log를 추가합니다.
    console.dir(client); 

    const tokenVotingClient = new TokenVotingClient(tokenVotingParams);
    return tokenVotingClient;
  } catch (err) {
    console.error('❌ 토큰 보팅 클라이언트 생성 실패:', err);
    return null;
  }
};







