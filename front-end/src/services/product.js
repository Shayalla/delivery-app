import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const getProducts = async () => {
  try {
    const respostas = await axios.get(`${API_URL}customer/products`);
    return respostas;
  } catch (err) {
    console.log(err);
  }
};

export default getProducts;
