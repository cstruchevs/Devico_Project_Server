import Sequelize from 'sequelize'

import sequelize from '../db/database'
import User from './User'

const Notifications = sequelize.define('notifications', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

export default Notifications
