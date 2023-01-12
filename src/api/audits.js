import api from '.';

export const getAllAudits = async () => {
  try {
    const res = await api.get('/audits');
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAudit = async id => {
  try {
    const res = await api.get(`/audits/${id}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createAudit = async payload => {
  try {
    const res = await api.post('/audits', payload);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};
