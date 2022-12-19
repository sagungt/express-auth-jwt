const db = require('../models');
const { ROLES, user: User } = db;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body;
  User.findOne({
    where: { username },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username already in used!',
      });
      return;
    }
    
    User.findOne({
      where: { email },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Username already in used!',
        });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + role,
        });
        return;
      }
    }
  }

  next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
}

module.exports = verifySignUp;
