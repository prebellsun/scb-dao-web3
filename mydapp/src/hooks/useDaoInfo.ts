// src/hooks/useDaoInfo.ts
import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";

interface DaoInfo {
  name: string;
  description?: string;
  ensDomain?: string;
  token?: {
    name: string;
    symbol: string;
    totalSupply: string;
  };
}

export const useDaoInfo = () => {
  const { client } = useAragonClient();
  const [daoInfo, setDaoInfo] = useState<DaoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDaoInfo = async () => {
      if (!client) return;

      try {
        setLoading(true);
        const dao = await client.methods.dao();
        setDaoInfo({
          name: dao.name,
          description: dao.metadata?.description,
          ensDomain: dao.ensDomain,
          token: {
            name: dao.token.name,
            symbol: dao.token.symbol,
            totalSupply: dao.token.totalSupply,
          },
        });
        setError(null);
      } catch (err: any) {
        console.error("DAO 정보 가져오기 실패:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDaoInfo();
  }, [client]);

  return { daoInfo, loading, error };
};

