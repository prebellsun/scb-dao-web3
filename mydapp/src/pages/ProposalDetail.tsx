// src/pages/ProposalDetail.tsx
import { useParams } from "react-router-dom";
import { useProposalById } from "../hooks/useProposalById";
import { useVoteOnProposal } from "../hooks/useVoteOnProposal";
import { useState } from "react";

const ProposalDetail = () => {
  const { id } = useParams();
  const { proposal, loading, error } = useProposalById(id);
  const { voteOnProposal, isLoading, error: voteError, success } = useVoteOnProposal();
  const [voteStatus, setVoteStatus] = useState("all"); // 필터 상태

  const handleVote = (choice: "yes" | "no" | "abstain") => {
    if (!proposal) return;
    voteOnProposal(proposal.id, choice);
  };

  if (loading) return <div className="p-4">⏳ 제안을 불러오는 중입니다...</div>;
  if (error) return <div className="p-4 text-red-600">❌ 오류 발생: {error.message}</div>;
  if (!proposal) return <div className="p-4">📭 제안을 찾을 수 없습니다.</div>;

  const totalVotes =
    proposal.votes.yes + proposal.votes.no + proposal.votes.abstain || 1;

  const getPercent = (count: number) => ((count / totalVotes) * 100).toFixed(1);

  const filteredVotes = () => {
    if (voteStatus === "yes") return [{ label: "찬성", count: proposal.votes.yes }];
    if (voteStatus === "no") return [{ label: "반대", count: proposal.votes.no }];
    if (voteStatus === "abstain") return [{ label: "기권", count: proposal.votes.abstain }];
    return [
      { label: "찬성", count: proposal.votes.yes },
      { label: "반대", count: proposal.votes.no },
      { label: "기권", count: proposal.votes.abstain },
    ];
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 제안 상세 정보</h2>
      <p><strong>제목:</strong> {proposal.metadata.title}</p>
      <p><strong>설명:</strong> {proposal.metadata.summary}</p>
      <p><strong>상태:</strong> {proposal.status}</p>
      <p><strong>작성자:</strong> {proposal.creatorAddress}</p>
      <p><strong>투표 마감:</strong> {new Date(proposal.endDate).toLocaleString()}</p>

      {/* ✅ 투표 현황 시각화 + 필터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">📊 투표 현황</h3>

        <div className="mb-2 flex gap-2">
          <button
            className={`px-3 py-1 border rounded ${voteStatus === "all" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setVoteStatus("all")}
          >전체</button>
          <button
            className={`px-3 py-1 border rounded ${voteStatus === "yes" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setVoteStatus("yes")}
          >찬성</button>
          <button
            className={`px-3 py-1 border rounded ${voteStatus === "no" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setVoteStatus("no")}
          >반대</button>
          <button
            className={`px-3 py-1 border rounded ${voteStatus === "abstain" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setVoteStatus("abstain")}
          >기권</button>
        </div>

        <div className="space-y-1">
          {filteredVotes().map((v) => (
            <p key={v.label} className="text-sm">
              {v.label}: {v.count}표 ({getPercent(v.count)}%)
            </p>
          ))}
        </div>
      </div>

      {/* ✅ 투표하기 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🗳️ 투표하기</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleVote("yes")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isLoading}
          >찬성</button>
          <button
            onClick={() => handleVote("no")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isLoading}
          >반대</button>
          <button
            onClick={() => handleVote("abstain")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            disabled={isLoading}
          >기권</button>
        </div>
        {success && <p className="text-green-700 mt-2">✅ 투표 완료!</p>}
        {voteError && <p className="text-red-700 mt-2">❌ 오류 발생: {voteError.message}</p>}
      </div>
    </div>
  );
};

export default ProposalDetail;





