// src/components/ProposalList.tsx
import React from "react";
import { useProposals } from "../hooks/useProposals";

const ProposalList = () => {
  const { proposals, loading, error } = useProposals();

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>오류: {error}</p>;

  return (
    <div>
      <h2>DAO 제안 목록</h2>
      {proposals.length === 0 && <p>제안이 없습니다.</p>}
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <h4>{proposal.metadata.title || "제목 없음"}</h4>
            <p>{proposal.metadata.summary || proposal.metadata.description || "설명 없음"}</p>
            <p>상태: {proposal.state}</p>
            <p>작성일: {new Date(proposal.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
