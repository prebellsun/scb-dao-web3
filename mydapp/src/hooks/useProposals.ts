// src/hooks/useProposals.ts

import { useEffect, useState } from "react";
import type { TokenVotingProposalListItem } from "@aragon/sdk-client";
// useAragonClient 훅에서 context와 client, DAO_ADDRESS 모두 가져옵니다.
import { useAragonClient, DAO_ADDRESS } from "./useAragonClient"; 
import { getTokenVotingClient } from "../utils/getTokenVotingClient";

export interface SimpleProposal {
  id: string;
  metadata: {
    title?: string;
    summary?: string;
  };
}

export const useProposals = () => {
  // ✅ client 대신 context를 먼저 사용하도록 구조 분해 할당 변경
  const { context: aragonContext } = useAragonClient(); 
  const [proposals, setProposals] = useState<SimpleProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      // ✅ Context가 없을 경우 return
      if (!aragonContext) {
        setLoading(false); 
        return;
      }

      setLoading(true); 
      setError(null);   

      try {
        const pluginAddress = import.meta.env.VITE_TOKEN_VOTING_PLUGIN_ADDRESS;
        if (!pluginAddress) {
          throw new Error("Token voting plugin address not set in env");
        }

        // ✅ getTokenVotingClient에 aragonContext를 전달
        const tvClient = getTokenVotingClient(aragonContext, pluginAddress);
        if (!tvClient) {
          throw new Error("TokenVotingClient 생성 실패");
        }

        const items: TokenVotingProposalListItem[] = await tvClient.methods.getProposals({
          daoAddressOrEns: DAO_ADDRESS,
        });

        const formatted = items.map((p) => ({
          id: p.id,
          metadata: {
            title: p.metadata?.title ?? "", 
            summary: p.metadata?.summary ?? "", 
          },
        }));

        setProposals(formatted); 

      } catch (err) {
        console.error("❌ 제안 목록 불러오기 실패:", err); 
        setError(err as Error); 
      } finally {
        setLoading(false); 
      }
    };

    // ✅ aragonContext가 변경될 때마다 useEffect를 다시 실행합니다.
    fetchProposals();
  }, [aragonContext]); 

  return { proposals, loading, error };
};







