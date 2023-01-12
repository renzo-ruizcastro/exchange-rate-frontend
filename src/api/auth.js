import api from '.';

export const signup = async (username, password) => {
  try {
    const response = await api.post('/users/signup', { username, password });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/users/login', { username, password });
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
