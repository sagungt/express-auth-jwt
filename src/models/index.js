const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.db,
  config.user,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      ...config.pool
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/users.model')(sequelize, Sequelize);
db.role = require('../models/roles.model')(sequelize, Sequelize);
db.customer = require('../models/customers.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
