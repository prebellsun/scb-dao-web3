// src/utils/getTokenVotingClient.ts

// Client, TokenVotingClient, 그리고 Context를 임포트합니다.
// Context는 @aragon/sdk-client 패키지에서 재-export(re-export) 됩니다.
import { TokenVotingClient, Context } from '@aragon/sdk-client'; 

export const getTokenVotingClient = (
  // ✅ Context 인스턴스를 인자로 받습니다.
  aragonContext: Context | null, 
  // 이 인자는 TokenVotingClient 생성자에 직접 전달되지 않고,
  // 이후 getProposals 등 메서드 호출 시 사용될 수 있습니다.
  tokenVotingPluginAddress: string | undefined 
) => {
  if (!aragonContext) {
    console.error('❌ Aragon Context가 정의되지 않았습니다.');
    return null;
  }
  
  // tokenVotingPluginAddress는 getTokenVotingClient 자체의 필수 인자는 아님
  // (TokenVotingClient 생성자에 들어가지 않으므로)
  // 하지만 이후 getProposals 등의 메서드 호출 시 필요할 수 있음을 경고
  if (!tokenVotingPluginAddress) {
    console.warn('⚠️ Token Voting 플러그인 주소가 정의되지 않았습니다.');
  }

  try {
    // 🎉 TokenVotingClient의 생성자가 Context 객체를 직접 받습니다! 🎉
    const tvClient = new TokenVotingClient(aragonContext); 

    return tvClient;
  } catch (err) {
    console.error('❌ 토큰 보팅 클라이언트 생성 실패:', err);
    return null;
  }
};








