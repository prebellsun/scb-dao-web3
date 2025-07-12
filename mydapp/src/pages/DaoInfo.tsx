import React from "react";
import { useDaoInfo } from "../hooks/useDaoInfo";

const DaoInfo = () => {
  const { dao, loading, error } = useDaoInfo();

  if (loading) return <div>Loading DAO Info...</div>;
  if (error) return <div>Error loading DAO info: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">DAO 정보</h2>
      {dao ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {dao.name}</p>
          <p><strong>Address:</strong> {dao.address}</p>
          <p><strong>Metadata URI:</strong> {dao.metadataUri}</p>
          <p><strong>Network:</strong> {dao.network}</p>
        </div>
      ) : (
        <p>DAO 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default DaoInfo;

