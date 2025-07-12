import { useState } from "react";
import { useCreateAdminProposal } from "../hooks/useCreateAdminProposal";

const CreateAdminProposal = () => {
  const [description, setDescription] = useState("");
  const { createAdminProposal } = useCreateAdminProposal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAdminProposal(description);
    alert("✅ 관리자 제안이 생성되었습니다.");
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">🔐 관리자 제안 생성</h2>
      <textarea
        className="border p-2 w-full"
        placeholder="제안 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        관리자 제안 제출
      </button>
    </form>
  );
};

export default CreateAdminProposal;

