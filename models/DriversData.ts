import Sequelize from 'sequelize'

import sequelize from '../db/database'

const DriversData = sequelize.define('driversData', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: { type: Sequelize.STRING, allowNull: true },
  dob: { type: Sequelize.DATE, allowNull: true },
  regAdress: { type: Sequelize.STRING, allowNull: true },
  driverLicense: { type: Sequelize.STRING, allowNull: true },
  representiveFullName: { type: Sequelize.STRING, allowNull: true },
  representiveLicense: { type: Sequelize.STRING, allowNull: true },
  idNumber: { type: Sequelize.STRING, allowNull: true },
  sportDriverLicense: { type: Sequelize.STRING, allowNull: true },
  nickname: { type: Sequelize.STRING, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: true },
})
  
export default DriversData
