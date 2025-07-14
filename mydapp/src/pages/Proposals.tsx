// src/pages/Proposals.tsx

import { useEffect, useState } from 'react';
import { useAragonClient } from '../hooks/useAragonClient';
import { getTokenVotingClient } from '../utils/getTokenVotingClient';

export default function Proposals() {
  const { client, dao } = useAragonClient();
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ client와 dao가 없으면 아예 fetch도 시도하지 않도록 방지
  const isReady = client && dao;

  useEffect(() => {
    if (!isReady) return;

    const fetchProposals = async () => {
      console.log('🔍 dao.plugins:', dao.plugins);

      const daoPlugins = dao.plugins ?? [];
      const tokenVotingPlugin = daoPlugins.find(
        (plugin) => plugin.id === 'token-voting.plugin.dao.eth'
      );

      console.log('✅ tokenVotingPlugin address:', tokenVotingPlugin?.instanceAddress);

      if (!tokenVotingPlugin?.instanceAddress) {
        console.warn('❗ TokenVoting plugin instanceAddress 없음');
        return;
      }

      const tokenVotingClient = getTokenVotingClient(client, tokenVotingPlugin.instanceAddress);

      if (!tokenVotingClient) {
        console.warn('❗ tokenVotingClient 생성 실패');
        return;
      }

      try {
        const result = await tokenVotingClient.methods.getProposals({
          pagination: { limit: 10, offset: 0 },
        });

        console.log('✅ 제안 목록:', result);
        setProposals(result.items ?? []);
      } catch (error) {
        console.error('❌ 제안 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [isReady]);

  // 🔄 로딩 중 또는 클라이언트 준비 전이면 메시지 출력
  if (!isReady || loading) return <p>🔄 불러오는 중...</p>;

  if (!proposals.length) return <p>📭 제안이 없습니다.</p>;

  return (
    <div>
      <h2>📋 제안 목록</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <strong>📝 {proposal.metadata?.title || '제목 없음'}</strong><br />
            상태: {proposal.status}<br />
            생성일: {new Date(proposal.creationDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}









