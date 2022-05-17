import Sequelize from 'sequelize'

import sequelize from '../db/database'
import Car from './Car'
import Event from './Event'
import User from './User'

const EventParticipants = sequelize.define('event-participants', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  vehicleClass: { type: Sequelize.STRING, allowNull: false },
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
})

export default EventParticipants
