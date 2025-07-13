// src/hooks/useDaoInfo.ts
import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";
import { DAO_ADDRESS } from "./useAragonClient";
import { Address } from "viem";
import { Dao } from "@aragon/sdk-client"; // Dao 타입은 @aragon/sdk-client에 정의되어 있습니다.

export const useDaoInfo = () => {
  const { client } = useAragonClient();
  const [daoInfo, setDaoInfo] = useState<Dao | null>(null); // ✅ Dao 타입 사용
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDaoInfo = async () => {
      if (!client) {
        setDaoInfo(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // client.methods.getDao()는 인자로 DAO 주소를 받습니다.
        // useAragonClient에서 ContextParams에 daoAddress를 설정했으므로
        // 이 인자는 중복될 수 있지만, 오류를 해결하기 위해 명시적으로 전달합니다.
        const info = await client.methods.getDao(DAO_ADDRESS as Address);

        if (!info) {
          setError(new Error("DAO 정보를 찾을 수 없습니다. (유효한 DAO 주소인지 확인하세요)"));
          setDaoInfo(null);
        } else {
          setDaoInfo(info);
        }
      } catch (e: unknown) { // ✅ unknown 타입 사용
        console.error("Error fetching DAO info:", e);
        setError(e instanceof Error ? e : new Error(`알 수 없는 오류 발생: ${String(e)}`));
        setDaoInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDaoInfo();
  }, [client]);

  return { daoInfo, loading, error };
};
