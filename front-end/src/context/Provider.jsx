import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser, createUser, getAllUsers } from '../services/user';
import { getOrderById } from '../services/customer';
import getProducts from '../services/product';
import Context from './Context';

function Provider({ children }) {
  const [status, setStatus] = useState('');
  const [value, setValue] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotaPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [sales, setSales] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [orderIdCheckout, setOrderIdCheckout] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const [finished, setFinished] = useState(false);
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const getAllProducts = async () => {
    const { data: allProducts } = await getProducts();
    setProducts(allProducts);
  };

  const getUsers = async () => {
    const { data: allUsers } = await getAllUsers();
    setUsers(allUsers);
  };

  const getOrderId = async (id) => {
    const { data: order } = await getOrderById(id);
    setOrderId(order);
  };

  useEffect(() => {
    getAllProducts();
    getUsers();
  }, []);

  const setToken = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
  };

  const handleClickLogin = async (user) => {
    if (!user.email || !user.password) setErrorMsg(true);
    const { data } = await loginUser({ email, password });

    if (data.role === 'administrator') {
      setToken(data);
      return history.push({ pathname: '/admin/manage' });
    }

    if (data.role === 'seller') {
      setToken(data);
      return history.push({ pathname: '/seller/orders' });
    }

    setToken(data);
    history.push({ pathname: '/customer/products' });
  };

  const handleClickRegister = async () => {
    const create = await createUser({ name, email, password });
    if (!create) return setErrorMsg(true);
    setToken(create.data);
    history.push({ pathname: '/customer/products' });

    return create;
  };

  const states = {
    name,
    value,
    email,
    password,
    errorMsg,
    products,
    totalPrice,
    total,
    hidden,
    sales,
    orderId,
    carrinho,
    finished,
    orderIdCheckout,
    status,
    role,
    users,
    setName,
    setValue,
    setEmail,
    setPassword,
    handleClickLogin,
    handleClickRegister,
    setTotaPrice,
    setTotal,
    setHidden,
    setSales,
    getOrderId,
    setCarrinho,
    setFinished,
    setOrderIdCheckout,
    setStatus,
    setRole,
    setUsers,
    getUsers,
  };

  return (
    <Context.Provider value={ states }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
