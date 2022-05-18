import Sequelize from 'sequelize'

import sequelize from '../db/database'

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  place: { type: Sequelize.STRING, allowNull: false },
  discipline: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  series: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: true },
  costOfParticipation: { type: Sequelize.STRING, allowNull: false },
  eventInfo: { type: Sequelize.STRING, allowNull: false },
  statusProgress: { type: Sequelize.STRING, allowNull: false },
})

export default Event
