import { aragonClient } from './lib/aragonClient';

export const fetchDaoInfo = async () => {
  try {
    const dao = await aragonClient.methods.getDao();
    console.log('DAO 정보:', dao);
    return dao;
  } catch (error) {
    console.error('DAO 정보 가져오기 실패:', error);
  }
};
