const {
  verifySignUp: {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
  },
} = require('../middleware');
const { signin, signup } = require('../controllers/auth.controller');
const { validate } = require('express-validation');
const { registerValidation, loginValidation } = require('../validation');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted,
      validate(registerValidation),
    ],
    signup,
  );

  app.post('/api/auth/signin', validate(loginValidation), signin);
};
