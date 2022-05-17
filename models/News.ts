import Sequelize from 'sequelize'

import sequelize from '../db/database'

const News = sequelize.define('news', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

export default News
