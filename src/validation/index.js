const { loginValidation, registerValidation } = require("./auth.validation");
const { createCustomerValidation, updateVustomerValidation } = require("./customer.validation");

module.exports = {
  loginValidation,
  registerValidation,
  createCustomerValidation,
  updateVustomerValidation,
};
