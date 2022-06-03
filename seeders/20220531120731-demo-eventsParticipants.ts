'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('event_participants', [
      {
        vehicleClass: 'Honda Civic',
        userId: 1,
        eventId: 5,
        carId: 1,
        desiredPartNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleClass: 'BMW X5',
        userId: 2,
        eventId: 5,
        carId: 4,
        desiredPartNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleClass: 'Shkoda Octavia',
        userId: 3,
        eventId: 5,
        carId: 5,
        desiredPartNumber: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleClass: 'Ford Focus',
        userId: 4,
        eventId: 5,
        carId: 6,
        desiredPartNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('event_participants', null, {})
  }
};
