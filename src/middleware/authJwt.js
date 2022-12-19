const jwt = require('jsonwebtoken');
const db = require('../models');
const { secret } = require('../config/auth.config');
const { user: User } = db;

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (const role of roles) {
        if (role.name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!'
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (const role of roles) {
        if (role.name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator Role!'
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (const role of roles) {
        if (role.name === 'moderator') {
          next();
          return;
        }

        if (role.name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator or Admin Role!'
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};

module.exports = authJwt;
