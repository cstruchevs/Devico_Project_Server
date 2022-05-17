'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news', [
      {
        title: 'The second stage of the national series "X-TEAM Time Attack 2021" took place',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)),
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaqu...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Etiam iaculis, magna dictum gravida euismod',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*2),
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Curabitur eu consectetur nisi, non congue velit. Nullam nec egestas quam.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*3),
        description: 'Curabitur eu consectetur nisi, non congue velit. Vestibulum id nibh pellentesque sem accumsan gravida vel in dolor. Fusce in semper augue...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mauris non felis nisl. Nulla facilisi.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*4),
        description: 'Nam malesuada lectus a leo finibus auctor. Quisque eget velit vestibulum, imperdiet erat at, egestas velit...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Ut volutpat nibh eget dolor sodales, ac pharetra nibh scelerisque.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*6),
        description: 'Donec fringilla, felis a rhoncus convallis, sapien ex ultrices lorem, aliquam pulvinar leo eros quis magna. Etiam fermentum mi... ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Fusce vel lobortis enim, sit amet pellentesque risus.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*7),
        description: 'Proin sit amet nisl vel est fermentum malesuada nec vitae orci. In commodo odio eget elementum pretium. Donec maximus diam laoreet ligula commodo...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news', null, {})
  }
};
