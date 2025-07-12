// src/hooks/useDaoInfo.ts
import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useDaoInfo = () => {
  const { client } = useAragonClient();
  const [daoInfo, setDaoInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDaoInfo = async () => {
      if (!client) return;
      setLoading(true);
      const info = await client.methods.getDao();
      setDaoInfo(info);
      setLoading(false);
    };
    fetchDaoInfo();
  }, [client]);

  return { daoInfo, loading };
};
