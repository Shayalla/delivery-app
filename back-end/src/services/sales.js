const { Sale, SaleProduct, Product } = require('../database/models');

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status }) => {
    const newSale = await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });

    return newSale;
};

const createSaleProduct = async ({
  saleId,
  productId,
  quantity }) => {
    const newSaleProduct = await SaleProduct.create({
      saleId,
      productId,
      quantity,
    });

    return newSaleProduct;
};

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id, { include: { model: Product, as: 'products' } });

  return sale;
};

const getAllSales = async () => {
  const sales = await Sale.findAll({ include: { model: Product, as: 'products' } });
  return sales;
};

const updateSale = async (id, update) => {
  const sale = await Sale.update({ status: update }, { where: { id } });
  return sale;
};

module.exports = {
  createSale,
  createSaleProduct,
  getSaleById,
  getAllSales,
  updateSale,
};
