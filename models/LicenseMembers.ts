import Sequelize from 'sequelize'

import sequelize from '../db/database'
import License from './License'
import User from './User'

const LicenseMembers = sequelize.define("license-members", {
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
      key: 'id'
    }
  },licenseId: {
    type: Sequelize.INTEGER,
    references: {
      model: License, 
      key: 'id'
    }
  }
});

export default LicenseMembers