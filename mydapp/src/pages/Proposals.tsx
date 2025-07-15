// src/pages/Proposals.tsx

import { useEffect, useState } from 'react';
import { useAragonClient } from '../hooks/useAragonClient';
import { useDaoInfo } from '../hooks/useDaoInfo'; // useDaoInfo 훅 임포트 추가
import { getTokenVotingClient } from '../utils/getTokenVotingClient';

export default function Proposals() {
  // 1. 'dao' 속성 접근 오류 해결: useAragonClient에서 dao를 가져오지 않고 client만 사용
  const { client } = useAragonClient();
  // useDaoInfo 훅을 사용하여 daoInfo, 로딩, 오류 상태를 가져옴
  const { daoInfo, loading: daoLoading, error: daoError } = useDaoInfo();
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // isReady 조건에 daoInfo와 daoLoading 상태를 포함
  const isReady = client && daoInfo && !daoLoading;

  useEffect(() => {
    if (!isReady) {
      setLoading(true); // client 또는 daoInfo가 준비되지 않았거나, dao 정보 로딩 중이면 제안 목록 로딩 상태 유지
      return;
    }

    const fetchProposals = async () => {
      setLoading(true); // 제안 목록 로딩 시작

      // 1. 'dao' 속성 접근 오류 해결: daoInfo를 사용하여 plugins에 접근
      console.log('🔍 daoInfo.plugins:', daoInfo.plugins);

      const daoPlugins = daoInfo.plugins ?? [];
      const tokenVotingPlugin = daoPlugins.find(
        (plugin) => plugin.id === 'token-voting.plugin.dao.eth'
      );

      console.log('✅ tokenVotingPlugin address:', tokenVotingPlugin?.instanceAddress);

      if (!tokenVotingPlugin?.instanceAddress) {
        console.warn('❗ TokenVoting plugin instanceAddress 없음');
        setLoading(false); // 플러그인 없으면 로딩 종료
        return;
      }

      const tokenVotingClient = getTokenVotingClient(client, tokenVotingPlugin.instanceAddress);

      if (!tokenVotingClient) {
        console.warn('❗ tokenVotingClient 생성 실패');
        setLoading(false); // 클라이언트 생성 실패 시 로딩 종료
        return;
      }

      try {
        // 3. 'pagination' 파라미터 오류 해결: pagination 객체 대신 skip과 limit 사용
        const result = await tokenVotingClient.methods.getProposals({
          skip: 0,
          limit: 10,
        });

        console.log('✅ 제안 목록:', result);
        // 2. 'items' 속성 접근 오류 해결: result 자체가 배열이므로 .items 제거
        setProposals(result ?? []);

      } catch (error) {
        console.error('❌ 제안 불러오기 실패:', error);
        setProposals([]); // 제안 불러오기 실패 시 proposals를 비움
      } finally {
        setLoading(false); // 제안 목록 로딩 종료
      }
    };

    fetchProposals();
  }, [isReady, client, daoInfo]); // 의존성 배열에 isReady, client, daoInfo 추가

  // 🚨 DAO 정보 로드 중 오류 발생 시
  if (daoError) {
    return <p style={{ color: "red" }}>🚨 DAO 정보 로드 오류: {daoError.message}</p>;
  }

  // 🔄 로딩 중 또는 클라이언트 준비 전이면 메시지 출력
  if (!isReady || loading) {
    return <p>🔄 불러오는 중...</p>;
  }

  // 📭 제안이 없을 경우
  if (!proposals.length) {
    return <p>📭 제안이 없습니다.</p>;
  }

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




















