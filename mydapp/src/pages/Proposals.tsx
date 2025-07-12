import { useProposals } from "../hooks/useProposals";
import { Link } from "react-router-dom";

const Proposals = () => {
  const { proposals } = useProposals();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📄 DAO 제안 목록</h2>
      <ul className="space-y-2">
        {proposals.map((proposal) => (
          <li key={proposal.id} className="border p-3 rounded hover:bg-gray-100">
            <Link to={`/proposals/${proposal.id}`}>
              <strong>{proposal.metadata.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Proposals;

