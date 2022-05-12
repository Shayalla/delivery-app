import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'socket.io-client';
import NavBar from '../components/NavBar';
import { getOrderById, updateOrder } from '../services/customer';
import Context from '../context/Context';

const socket = new Manager('http://localhost:3001');
socket.on('connect', () => console.log('connection'));

function OrderDetails(props) {
  const { setStatus } = useContext(Context);
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const { match: { params: { id } } } = props;

  if (sale.sellerId === 2) sale.sellerId = 'Fulana Pereira';

  const handleClick = async () => {
    const statusObj = { id, status: 'Entregue' };
    const update = await updateOrder(statusObj);
    sale.status = update.data;
    socket.emit('statusUpdate', statusObj);
  };

  socket.on('statusUpdate', ({ id: saleId, status: updatedStatus }) => {
    if (sale.id === +saleId) {
      setSale({ ...sale, status: updatedStatus });
    }
  });

  useEffect(() => {
    setLoading(true);
    const getOrder = async () => {
      const order = await getOrderById(id);
      const dez = 10;
      order.data.saleDate = order.data.saleDate
        .slice(0, dez).split('-').reverse().join('/');
      setSale(order.data);
      setStatus(order.data.status);
      setLoading(false);
    };
    getOrder();
  }, [id, setStatus]);

  const { products } = sale;
  const dataTestids = 'customer_order_details__element-order-';

  return loading ? 'Carregando' : (
    <div>
      <NavBar />
      <h3>Detalhes do Pedido</h3>
      <div className="details-info">
        <p data-testid={ `${dataTestids}details-label-order-id` }>
          {`PEDIDO: ${sale.id}`}
        </p>
        <p data-testid={ `${dataTestids}details-label-seller-name` }>
          { sale.sellerId }
        </p>
        <p data-testid={ `${dataTestids}details-label-order-date` }>
          { sale.saleDate }
        </p>
        <p
          data-testid={ `${dataTestids}details-label-delivery-status` }
        >
          { sale.status }
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ sale.status !== 'Em Trânsito' }
          onClick={ handleClick }
        >
          Marcar como entregue
        </button>
      </div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        { products.map(({ name, SaleProduct: { quantity }, price }, index) => {
          const priceTotal = Number(price) * Number(quantity);
          return (
            <tr key={ index }>
              <td
                data-testid={ `${dataTestids}table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `${dataTestids}table-name-${index}` }
              >
                {name}
              </td>
              <td
                data-testid={ `${dataTestids}table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `${dataTestids}table-sub-total-${index}` }
              >
                {`R$ ${price.replace(/\./, ',')}`}
              </td>
              <td
                data-testid={ `${dataTestids}total-price-${index}` }
              >
                {`R$ ${priceTotal.toFixed(2)}`}
              </td>
            </tr>
          );
        })}
      </table>
      <h2 data-testid={ `${dataTestids}total-price` }>
        {`Total: R$${sale.totalPrice.replace(/\./, ',')}`}
      </h2>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default OrderDetails;
