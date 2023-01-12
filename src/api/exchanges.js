import api from '.';

export const getAllExchanges = async (token, params) => {
  try {
    const paramsObj = params || {};
    const response = await api.get('/exchanges', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      paramsObj,
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getExchange = async (token, id) => {
  try {
    const response = await api.get(`/exchanges/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createExchange = async (token, payload) => {
  try {
    const response = await api.post('/exchanges', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExchange = async (id, payload) => {
  try {
    const response = await api.patch(`/exchanges/${id}`, payload);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteExchange = async id => {
  try {
    const response = await api.delete(`/exchanges/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
