// src/pages/Proposals.tsx

import React from "react";
import { useProposals } from "../hooks/useProposals";

const Proposals: React.FC = () => {
  const { proposals, loading, error } = useProposals();

  if (loading) {
    return <div className="p-4 text-gray-600">📦 제안 목록 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        ❌ 제안 목록 로드 실패: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 제안 목록</h1>

      {proposals.length === 0 ? (
        <div className="text-gray-500">아직 등록된 제안이 없습니다.</div>
      ) : (
        <ul className="space-y-4">
          {proposals.map((proposal) => (
            <li
              key={proposal.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">
                🗳️ {proposal.metadata.title || "제목 없음"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                설명: {proposal.metadata.summary || "설명 없음"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                제안 ID: {proposal.id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Proposals;





















