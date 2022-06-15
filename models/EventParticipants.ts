import Sequelize from 'sequelize'

import sequelize from '../db/database'
import Car from './Car'
import Event from './Event'
import User from './User'

const EventParticipants = sequelize.define('event_participants', {
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
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
  },
  carId: {
    type: Sequelize.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
  },
  vehicleClass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desiredPartNumber: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
})

export default EventParticipants
