// mydapp/src/components/ProposalDetail.tsx
import { useParams } from 'react-router-dom';

const ProposalDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Proposal Detail</h2>
      <p>Proposal ID: {id}</p>
      {/* 여기에 상세 내용, 투표 현황 등 추가 예정 */}
    </div>
  );
};

export default ProposalDetail;
