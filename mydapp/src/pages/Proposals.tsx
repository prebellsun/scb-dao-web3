import { useProposals } from "../hooks/useProposals";
import { Link } from "react-router-dom";
import { useState } from "react";

const Proposals = () => {
  const { proposals } = useProposals();

  const [sortKey, setSortKey] = useState<"newest" | "oldest" | "yesVotes" | "endSoon">("newest");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const sortedProposals = [...proposals].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    const yesA = a.tally?.yes || 0;
    const yesB = b.tally?.yes || 0;
    const endA = new Date(a.endDate || 0).getTime();
    const endB = new Date(b.endDate || 0).getTime();

    switch (sortKey) {
      case "oldest":
        return dateA - dateB;
      case "yesVotes":
        return yesB - yesA;
      case "endSoon":
        return endA - endB;
      case "newest":
      default:
        return dateB - dateA;
    }
  });

  const filteredProposals =
    statusFilter === "ALL"
      ? sortedProposals
      : sortedProposals.filter((p) => p.status === statusFilter);

  const getStatusBadge = (status: string) => {
    const base = "text-xs font-semibold px-2 py-1 rounded";
    switch (status) {
      case "ACTIVE":
        return `${base} bg-blue-100 text-blue-800`;
      case "EXECUTED":
        return `${base} bg-green-100 text-green-800`;
      case "CANCELLED":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 DAO 제안 목록</h2>

      {/* 🔍 필터 및 정렬 컨트롤 */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border px-3 py-1 rounded shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">전체 상태</option>
          <option value="ACTIVE">진행 중</option>
          <option value="EXECUTED">실행 완료</option>
          <option value="CANCELLED">취소됨</option>
        </select>

        <select
          className="border px-3 py-1 rounded shadow-sm"
          value={sortKey}
          onChange={(e) =>
            setSortKey(e.target.value as "newest" | "oldest" | "yesVotes" | "endSoon")
          }
        >
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="yesVotes">찬성 많은 순</option>
          <option value="endSoon">마감일 빠른 순</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredProposals.map((proposal) => (
          <li
            key={proposal.id}
            className="border p-4 rounded-lg hover:shadow-md transition bg-white"
          >
            <Link to={`/proposals/${proposal.id}`} className="block">
              <div className="flex justify-between items-center">
                <strong className="text-lg">{proposal.metadata.title}</strong>
                <span className={getStatusBadge(proposal.status)}>{proposal.status}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                생성일: {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-1">
                찬성: {proposal.tally?.yes || 0} | 반대: {proposal.tally?.no || 0} | 기권:{" "}
                {proposal.tally?.abstain || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                마감일: {new Date(proposal.endDate).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {filteredProposals.length === 0 && (
        <p className="text-gray-500 mt-6">📭 조건에 맞는 제안이 없습니다.</p>
      )}
    </div>
  );
};

export default Proposals;




