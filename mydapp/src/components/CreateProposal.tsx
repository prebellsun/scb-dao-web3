// src/components/CreateProposal.tsx
import { useState } from "react";
import { useCreateProposal } from "../hooks/useCreateProposal";

const CreateProposal = () => {
  const { createProposal, loading, txHash, error } = useCreateProposal();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProposal({
      title,
      summary: "Test proposal",
      description: "This is a test proposal for the SCB DAO.",
      actions: [
        {
          to: "0x0000000000000000000000000000000000000000", // 더미 주소
          value: 0n,
          data: "0x", // 빈 calldata
        },
      ],
    });
  };

  return (
    <div>
      <h2>새 제안 생성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제안 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "생성 중..." : "제안 생성"}
        </button>
      </form>

      {txHash && <p>성공! 트랜잭션 해시: {txHash}</p>}
      {error && <p style={{ color: "red" }}>오류: {error}</p>}
    </div>
  );
};

export default CreateProposal;


