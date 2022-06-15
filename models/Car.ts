import Sequelize from 'sequelize'

import sequelize from '../db/database'
import EventParticipants from './EventParticipants'

const Car = sequelize.define('car', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  model: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.STRING, allowNull: false },
  capaciteEngine: { type: Sequelize.STRING, allowNull: false },
  regVihicleNumber: { type: Sequelize.STRING, allowNull: false },
  technicalPassNumber: { type: Sequelize.STRING, allowNull: false },
  viaNumber: { type: Sequelize.STRING, allowNull: false },
  driveTrain: { type: Sequelize.STRING, allowNull: false },
  fullNameOwner: { type: Sequelize.STRING, allowNull: false },
})

//Associations
Car.hasMany(EventParticipants, { foreignKey: 'carId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
EventParticipants.belongsTo(Car)

export default Car
