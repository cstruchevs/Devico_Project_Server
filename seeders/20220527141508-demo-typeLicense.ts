'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('licensetypes', [
      {
        name: 'DL',
        cost: '500 UAN',
        description:
          '(suitable for participation in national series: rally on production cars, slalom, gymkhana, time attacks)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'D1',
        cost: '2000 UAN',
        description:
          '(suitable for participation in national series: rally on production cars, slalom, gymkhana, time attacks)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'D0',
        cost: '2500 UAN',
        description:
          '(suitable for participation in national series: rally on production cars, slalom, gymkhana, time attacks)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'RL',
        cost: '300 UAN',
        description: '(signle)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DD',
        cost: '500 UAN',
        description: '(children`s)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DU',
        cost: '1200 UAN',
        description: '(youth, up to 18 years old)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'D4',
        cost: '1700 UAN',
        description: '(for participation in competitions on ATVs)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('licensetypes', null, {})
  },
}
