import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getOrderById = async (id) => {
  try {
    const respostas = await axios.get(`${API_URL}customer/orders/${id}`);
    // console.log(respostas);
    return respostas;
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async () => {
  try {
    const respostas = await axios.get(`${API_URL}customer/orders`);
    // console.log(respostas);
    return respostas;
  } catch (err) {
    console.log(err);
  }
};

export const createOrders = async (order, token) => {
  try {
    const respostas = await axios.post(
      `${API_URL}customer/orders`,
      order,
      { headers: { authorization: token } },
    );
    // console.log(respostas);
    return respostas;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrder = async (up) => {
  try {
    const respostas = await axios.put(`${API_URL}customer/orders/update`, up);
    console.log(respostas);
    return respostas;
  } catch (err) {
    console.log(err);
  }
};
