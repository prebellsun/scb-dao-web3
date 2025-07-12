import { useParams } from "react-router-dom";
import { useProposalDetail } from "../hooks/useProposalDetail";

const ProposalDetail = () => {
  const { id } = useParams();
  const { proposal } = useProposalDetail(id);

  if (!proposal) return <p>⏳ 제안 정보를 불러오는 중...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{proposal.metadata.title}</h2>
      <p>{proposal.metadata.description}</p>
      <p className="mt-4 text-sm text-gray-600">상태: {proposal.status}</p>
    </div>
  );
};

export default ProposalDetail;

