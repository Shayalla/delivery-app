import React from 'react';
import { useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const { name } = user;
  const { location } = history;

  const logout = () => {
    // localStorage.clear();
    history.push({ pathname: '/login' });
    localStorage.removeItem('user');
  };

  const redirect = (path) => history.push({ pathname: path });

  const renderMeusPedidos = (path) => {
    if (location.pathname.includes(path)) {
      return (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => redirect('/customer/orders') }
        >
          Meus Pedidos
        </button>
      );
    }
  };

  const renderMeusPedidosSeller = (path) => {
    if (location.pathname.includes(path)) {
      return (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => redirect('/seller/orders') }
        >
          Meus Pedidos
        </button>
      );
    }
  };

  const adminManagerUsers = (path) => {
    if (location.pathname.includes(path)) {
      return (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => redirect('/admin/manage') }
        >
          Gerenciar Usuários
        </button>
      );
    }
  };

  const products = (path) => {
    if (location.pathname.includes(path)) {
      return (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => redirect('/customer/products') }
        >
          Produtos
        </button>
      );
    }
  };

  return (
    <header>
      { adminManagerUsers('/admin/manage') }
      { products('/customer/') }
      { renderMeusPedidos('/customer/') }
      { renderMeusPedidosSeller('/seller/') }
      <span data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </span>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        Sair
      </button>
    </header>
  );
}

export default NavBar;
