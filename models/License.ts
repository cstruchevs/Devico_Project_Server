import Sequelize from 'sequelize'

import sequelize from '../db/database'
import LicenseMembers from './LicenseMembers'
import User from './User'

const License = sequelize.define('license', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullNameUkranian: { type: Sequelize.STRING, allowNull: false },
  fullNameLatin: { type: Sequelize.STRING, allowNull: false },
  dob: { type: Sequelize.DATE, allowNull: false },
  nativeCity: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING, allowNull: false },
  identificationNum: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
})

export default License
