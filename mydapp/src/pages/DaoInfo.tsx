// src/pages/DaoInfo.tsx
import { useEffect, useState } from "react";
import { useAragonClient } from "../hooks/useAragonClient";

const DaoInfo = () => {
  const { client } = useAragonClient();
  const [dao, setDao] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDao = async () => {
      if (!client) return;
      try {
        // ✅ dao 정보 조회 시 명시적으로 주소를 넘김
        const result = await client.methods.getDao("0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081");
        setDao(result);
      } catch (err: any) {
        setError(err.message || "DAO 정보 불러오기 실패");
        console.error("❌ DAO 정보 불러오기 실패:", err);
      }
    };

    fetchDao();
  }, [client]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🧠 DAO 정보</h2>
      {error && <p style={{ color: "red" }}>🚨 오류: {error}</p>}
      {dao ? (
        <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem" }}>
          {JSON.stringify(dao, null, 2)}
        </pre>
      ) : (
        <p>⏳ DAO 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default DaoInfo;




