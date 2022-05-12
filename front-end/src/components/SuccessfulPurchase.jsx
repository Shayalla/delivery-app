import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SuccessfulPurchase() {
  const history = useHistory();
  const ONE_SEC = 1000;
  useEffect(() => {
    setTimeout(() => {
      history.push({ pathname: '/customer/orders/' });
    }, ONE_SEC);
    // eslint-disable-next-line
  }, []);

  return (
    <h2>
      Compra realizada com sucesso!
    </h2>
  );
}

export default SuccessfulPurchase;
