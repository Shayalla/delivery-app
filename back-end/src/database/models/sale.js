'use strict';

const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    userId: {
      type: DataTypes.INTEGER,
    },
    sellerId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      // defaultValue: 'Pendente'
    },
  },
  { timestamps: false, tableName: 'sales', underscored: true });

  sale.associate = (models) => {
    sale.belongsTo(models.User,{
      as: 'users',
      foreignKey: 'user_id'
    });
  }
  return sale;
};

module.exports = Sale;
