import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import sequelize from '../db/database'
import DriversData from './DriversData'
import Car from './Car'
import License from './License'
import LicenseMembers from './LicenseMembers'
import EventParticipants from './EventParticipants'
import Notifications from './Notifications'

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: true },
  fullName: { type: Sequelize.STRING, allowNull: true },
  status: { type: Sequelize.STRING, allowNull: true },
  avatarKey: { type: Sequelize.STRING, allowNull: true },
})

User.beforeCreate(async (user: any, next) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
})

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  delete values.password
  return values
}

User.beforeUpdate(async (user: any, next) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
})

User.prototype.createJWT = function () {
  return jwt.sign({ userId: this.id }, 'jwtsecret', {
    expiresIn: '1d',
  })
}

User.prototype.comparePassword = async function (candidatePassword: any) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

//Associations
User.hasOne(DriversData, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
DriversData.belongsTo(User)

User.hasMany(Car, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.belongsToMany(License, { through: LicenseMembers })
License.belongsToMany(User, { through: LicenseMembers })

User.hasMany(EventParticipants, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
EventParticipants.belongsTo(User)

User.hasMany(Notifications, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export default User
