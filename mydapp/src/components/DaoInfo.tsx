// src/components/DaoInfo.tsx
import { useDaoInfo } from "../hooks/useDaoInfo";

const DaoInfo = () => {
  const { daoInfo, loading, error } = useDaoInfo();

  if (loading) return <p>DAO 정보를 불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!daoInfo) return <p>DAO 정보 없음</p>;

  return (
    <div>
      <h2>DAO 이름: {daoInfo.name}</h2>
      <p>설명: {daoInfo.description}</p>
      <p>ENS: {daoInfo.ensDomain}</p>
      <p>토큰 이름: {daoInfo.token?.name}</p>
      <p>심볼: {daoInfo.token?.symbol}</p>
      <p>총 발행량: {daoInfo.token?.totalSupply}</p>
    </div>
  );
};

export default DaoInfo;
