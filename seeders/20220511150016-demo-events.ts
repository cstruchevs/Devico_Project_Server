'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('events', [
      {
        name: 'AUTO.RIA Race',
        date: new Date('12.12.2022'),
        place: 'Kharkiv. Maidan constitution',
        discipline: 'Digital motorsport.',
        status: 'National Seria',
        series: 'National Digital Time Attack Series (NS-CTA) 2021',
        costOfParticipation: '50$',
        eventInfo:
          'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. ',
        statusProgress: 'Finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('events', null, {})
  },
}
