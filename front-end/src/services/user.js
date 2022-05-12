import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const loginUser = (login) => {
  try {
    return axios.post(`${API_URL}login`, login);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = (user) => {
  try {
    return axios.post(`${API_URL}register`, user);
  } catch (error) {
    console.log(error);
  }
};

export const admimCreateUser = async (user, hasToken) => {
  try {
    const result = await axios.post(`${API_URL}register/administrator`,
      user,
      { headers: { authorization: hasToken } });
    return result;
  } catch (error) {
    return console.log(error);
  }
};

export const getAllUsers = () => {
  try {
    return axios.get(`${API_URL}login/users`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (id, hasToken) => {
  try {
    return axios.delete(`${API_URL}admin/manage`, { headers: {
      id,
      authorization: hasToken,
    } });
  } catch (err) {
    console.log(err);
  }
};
