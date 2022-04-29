import Sequelize from 'sequelize'

import sequelize from '../db/database'
import Event from './Event';
import User from './User';

const EventParticipants = sequelize.define("evet-participants", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User, 
      key: 'id'
    }
  },eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: Event, 
      key: 'id'
    }
  }
});

export default EventParticipants