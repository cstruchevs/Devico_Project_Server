import Sequelize from 'sequelize'

import sequelize from '../db/database'

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: true}
});

module.exports = User;
