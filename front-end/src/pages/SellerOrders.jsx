import React, { useEffect, useContext } from 'react';
import Context from '../context/Context';
import NavBar from '../components/NavBar';
import TableOrders from '../components/TableOders';
import { getOrders } from '../services/customer';

function SellerOrders() {
  const { sales, setSales } = useContext(Context);

  const allOrders = async () => {
    const { data } = await getOrders();
    setSales(data);
  };

  useEffect(() => {
    allOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      { sales.map((item) => (
        <TableOrders user="seller" key={ item.id } item={ item } />
      )) }
    </>
  );
}

export default SellerOrders;
