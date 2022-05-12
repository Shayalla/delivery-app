import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Card from './Card';

function CardList() {
  const { products, hidden, setHidden, setTotal } = useContext(Context);
  const CARRINHO_DE_COMPRAS = 'Carrinho de Compras';
  const loadStorage = localStorage.getItem(CARRINHO_DE_COMPRAS);
  let total = 0;

  if (loadStorage) {
    const storeJson = JSON.parse(loadStorage);
    total = Object.values(storeJson)
      .map((item) => Number(item.totalPrice))
      .reduce((acc, value) => acc + value, 0);

    if (total > 1) setHidden(false);
    setTotal(total);
  }

  return (
    <main>
      <section className="card">
        {products.map((item) => (
          <Card key={ item.id } item={ item } />
        ))}
      </section>
      <section className="card">
        <Link to="/customer/checkout">
          <button
            data-testid="customer_products__button-cart"
            type="button"
            disabled={ hidden }
          >
            <h3>Ver Carrinho:</h3>
            {' '}
            <h1 data-testid="customer_products__checkout-bottom-value">
              {total.toFixed(2).toString().replace('.', ',')}
            </h1>
          </button>
        </Link>
      </section>
    </main>
  );
}

export default CardList;
