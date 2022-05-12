'use strict';

const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
  },
  { timestamps: false, tableName: 'salesProducts', underscored: true });

  saleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: saleProduct,
      foreignKey: 'productId',
      otherkey: 'saleId',
    });

    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: saleProduct,
      foreignKey: 'saleId',
      otherkey: 'productId',
    });
  }

  return saleProduct;
};

module.exports = SaleProduct;
