// src/pages/CreateProposal.tsx
import { useState } from "react";
import { useCreateProposal } from "../hooks/useCreateProposal";

const CreateProposal = () => {
  const { createProposal } = useCreateProposal();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProposal(title, summary);
      setStatus("✅ 제안이 성공적으로 생성되었습니다!");
      setTitle("");
      setSummary("");
    } catch (error) {
      console.error(error);
      setStatus("❌ 제안 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📝 제안 생성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제안 제목</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>요약 설명</label><br />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
        </div>
        <button type="submit">제안하기</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default CreateProposal;


