import React from 'react';
import PropTypes from 'prop-types';

function CheckoutList(props) {
  const { item, index } = props;
  const { name, quantity, totalPrice, price } = item;
  return (
    <>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {name}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {quantity}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        {`R$ ${price.replace(/\./, ',')}`}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {`R$ ${totalPrice.replace(/\./, ',')}`}
      </td>
    </>
  );
}

CheckoutList.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default CheckoutList;
