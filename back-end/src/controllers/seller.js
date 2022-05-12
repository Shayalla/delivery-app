const express = require('express');
const rescue = require('express-rescue');
const { getSaleById, updateSale } = require('../services/sales');

const sellerRouter = express.Router();

sellerRouter.get('/orders/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);
  console.log('AQUIIIIIIIIIIII 6666');

  return res.status(200).json(sale);
}));

sellerRouter.put('/orders/update', rescue(async (req, res) => {
    const { id, status } = req.body;

    await updateSale(id, status);

    res.status(200).json(status);
  }));

module.exports = { sellerRouter };
