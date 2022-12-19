module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.INTEGER,
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
    },
    address: {
      type: Sequelize.TEXT,
    },
  });

  return Customer;
};
