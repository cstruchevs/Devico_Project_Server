'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'cstruchevs@gmail.com',
        password: await bcrypt.hash('semen2012', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'demo1@gmail.com',
        password: await bcrypt.hash('qweqweqwe', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'demo2h@gmail.com',
        password: await bcrypt.hash('qweqweqwe', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  },
}
