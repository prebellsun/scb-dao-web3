import React, { useState } from "react";
import { aragonClient } from "../lib/aragonClient";
import { encodeFunctionData } from "viem";
import { useAccount } from "wagmi";

const CreateAdminProposal: React.FC = () => {
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [executed, setExecuted] = useState(false);
  const [error, setError] = useState("");

  const handleProposalSubmit = async () => {
    try {
      if (!address) {
        setError("지갑이 연결되어 있지 않습니다.");
        return;
      }

      // 관리자 제안 실행 예시 (예: DAO 설명 변경 등)
      const actions = [
        {
          to: "0x0000000000000000000000000000000000000000", // 예시용 주소
          value: 0n,
          data: encodeFunctionData({
            abi: [], // 여기에 실제 실행할 ABI 입력 (예: metadata 업데이트 함수)
            functionName: "", // 예: "updateMetadata"
            args: [], // 예: ["새 DAO 설명"]
          }),
        },
      ];

      await aragonClient.methods.propose({
        metadata: {
          title,
          summary,
        },
        actions,
      });

      setExecuted(true);
      setError("");
    } catch (err) {
      console.error(err);
      setError("제안 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">🛠 관리자 제안 생성</h2>
      <input
        type="text"
        placeholder="제안 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-2"
      />
      <textarea
        placeholder="제안 요약 설명"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-2 border mb-2"
      />
      <button
        onClick={handleProposalSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        관리자 제안 제출
      </button>
      {executed && (
        <p className="text-green-600 mt-2">✅ 제안이 제출되었습니다.</p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreateAdminProposal;
