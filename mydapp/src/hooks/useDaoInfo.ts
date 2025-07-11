import { useEffect, useState } from "react";
import { aragonClient } from "../lib/aragonClient";

export function useDaoInfo() {
  const [dao, setDao] = useState(null);

  useEffect(() => {
    async function fetchDao() {
      const result = await aragonClient.methods.getDao("0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081");
      setDao(result);
    }
    fetchDao();
  }, []);

  return dao;
}
