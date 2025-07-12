// src/components/VoteProposal.tsx
import { useState } from "react";
import { useVoteProposal } from "../hooks/useVoteProposal";

const VoteProposal = () => {
  const { vote, loading, txHash, error } = useVoteProposal();
  const [proposalId, setProposalId] = useState("");
  const [selectedVote, setSelectedVote] = useState<"yes" | "no" | "abstain">("yes");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await vote({ proposalId, vote: selectedVote });
  };

  return (
    <div>
      <h2>제안 투표</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제안 ID"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          required
        />
        <select value={selectedVote} onChange={(e) => setSelectedVote(e.target.value as any)}>
          <option value="yes">찬성</option>
          <option value="no">반대</option>
          <option value="abstain">기권</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "투표 중..." : "투표하기"}
        </button>
      </form>
      {txHash && <p>투표 성공! 트랜잭션 해시: {txHash}</p>}
      {error && <p style={{ color: "red" }}>오류: {error}</p>}
    </div>
  );
};

export default VoteProposal;
