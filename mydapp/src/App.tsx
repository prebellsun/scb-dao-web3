import React, { useEffect, useState } from 'react';
import { fetchDaoInfo } from './services/daoService';

function App() {
  const [dao, setDao] = useState(null);

  useEffect(() => {
    const loadDao = async () => {
      const daoData = await fetchDaoInfo();
      setDao(daoData);
    };
    loadDao();
  }, []);

  return (
    <div>
      <h1>SCB DAO Dashboard</h1>
      {dao ? (
        <pre>{JSON.stringify(dao, null, 2)}</pre>
      ) : (
        <p>Loading DAO info...</p>
      )}
    </div>
  );
}

export default App;


