'use strict'

// city: { type: Sequelize.STRING, allowNull: true },
// dob: { type: Sequelize.DATE, allowNull: true },
// regAdress: { type: Sequelize.STRING, allowNull: true },
// driverLicense: { type: Sequelize.STRING, allowNull: true },
// representiveFullName: { type: Sequelize.STRING, allowNull: true },
// representiveLicense: { type: Sequelize.STRING, allowNull: true },
// idNumber: { type: Sequelize.STRING, allowNull: true },
// sportDriverLicense: { type: Sequelize.STRING, allowNull: true },
// nickname: { type: Sequelize.STRING, allowNull: true },
// phone: { type: Sequelize.STRING, allowNull: true }

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('driversData', [
      {
        nickname: 'Sierra Ferguson',
        city: 'Kharkiv',
        dob: new Date('1998-03-07'),
        regAdress: '234 Klochkovskaya street',
        driverLicense: '5565325ОDE66R5',
        representiveFullName: 'Dmitry Novik',
        phone: '775-015-1143',
        representiveLicense: '775',
        idNumber: '946132326227563',
        sportDriverLicense: '913DF2E27',
        User_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('driversData', null, {})
  },
}
