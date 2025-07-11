import { useDaoInfo } from "../hooks/useDaoInfo";

export default function DaoInfo() {
  const dao = useDaoInfo();
  if (!dao) return <p>Loading DAO info...</p>;

  return (
    <div>
      <h2>DAO Name: {dao.metadata.name}</h2>
      <p>Address: {dao.address}</p>
      <p>Description: {dao.metadata.description}</p>
    </div>
  );
}
