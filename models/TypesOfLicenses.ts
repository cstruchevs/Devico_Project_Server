import Sequelize from 'sequelize'

import sequelize from '../db/database'
import Car from './Car'
import Event from './Event'

const TypeOfLicense = sequelize.define('typeOfLicense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  licenseId: {
    type: Sequelize.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
  },
  licenseTypeName: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'name',
    },
  },
})

export default TypeOfLicense
