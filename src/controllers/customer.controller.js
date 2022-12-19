const db = require('../models');
const { customer: Customer } = db;

const getCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOne({
    where: { id },
  });
  if (customer) return res.status(200).send({
    message: 'success',
    data: customer,
  });
  return res.status(404).send({
    message: 'user not found',
    data: null,
  });
};

const getAllCustomers = async (req, res) => {
  const customers = await Customer.findAll();
  return res.status(200).send({
    message: 'success',
    data: customers,
  });
};

const addCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  return res.status(201).send({
    message: 'success',
    data: customer,
  });
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOne({
    where: { id },
  });
  if (customer) {
    const updatedCustomer = await Customer.update(req.body, {
      where: { id },
    });
    return res.status(200).send({
      message: 'success',
      data: updatedCustomer,
    });
  }
  return res.status(404).send({
    message: 'user not found',
    data: null,
  });
};
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOne({
    where: { id },
  });
  if (customer) {
    await Customer.destroy({
      where: { id },
    });

    return res.status(200).send({
      message: 'success',
      data: null,
    });
  }
  return res.status(404).send({
    message: 'user not found',
    data: null,
  });
};

module.exports = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
