const db = require('../models');
const { secret } = require('../config/auth.config');
const { user: User, role: Role } = db;

const { Op } = db.Sequelize;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  // Save User to Database
  const { username, email, password, roles } = req.body;
  User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully!' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = [];
    user.getRoles().then(roles => {
      for (const role of roles) {
        authorities.push('ROLE_' + role.name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};