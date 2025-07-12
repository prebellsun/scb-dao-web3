// src/components/CreateAdminProposal.tsx
import { useState } from "react";
import { useCreateAdminProposal } from "../hooks/useCreateAdminProposal";

const CreateAdminProposal = () => {
  const { createAdminProposal, loading, txHash, error } = useCreateAdminProposal();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createAdminProposal({
      title,
      description: "This is an admin-level proposal.",
      actions: [
        {
          to: "0x0000000000000000000000000000000000000000", // 관리자 대상 컨트랙트 주소
          value: 0n,
          data: "0x", // 관리자용 calldata (예: 권한 변경 등)
        },
      ],
    });
  };

  return (
    <div>
      <h2>관리자 제안 생성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제안 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "제안 생성 중..." : "제안 생성"}
        </button>
      </form>
      {txHash && <p>성공! 트랜잭션 해시: {txHash}</p>}
      {error && <p style={{ color: "red" }}>오류: {error}</p>}
    </div>
  );
};

export default CreateAdminProposal;

