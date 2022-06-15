import Sequelize from 'sequelize'

import sequelize from '../db/database'
import License from './License'

const LicenseType = sequelize.define('licenseType', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  cost: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
})

//Associations
LicenseType.hasMany(License, {
  foreignKey: 'licenseType_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

export default LicenseType
