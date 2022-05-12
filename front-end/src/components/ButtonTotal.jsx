import React, { useContext } from 'react';
import Context from '../context/Context';

function ButtonTotal() {
  const { total } = useContext(Context);
  return (
    <section className="card">
      <button
        type="button"
      >
        <h3>Ver Carrinho:</h3>
        {' '}
        <h1 data-testid="customer_products__checkout-bottom-value">
          R$
          {total.toFixed(2)}
        </h1>
      </button>
    </section>
  );
}

export default ButtonTotal;
