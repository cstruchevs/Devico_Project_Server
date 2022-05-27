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
        imageKey: "news/9b1f6dcf-70e7-4c9b-80ea-bdf071c1e24a",
      },
      {
        title: 'Etiam iaculis, magna dictum gravida euismod. Nullam nec egestas quam pellentesque risus.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*2),
        description: 'Donec fringilla, felis a rhoncus convallis, sapien ex ultrices lorem, aliquam pulvinar leo eros quis magna. Etiam fermentum mi... ',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageKey: "news/1d17f2be-996d-4d06-9c9e-3afbfae9f6ac",
      },
      {
        title: 'Curabitur eu consectetur nisi, non congue velit. Nullam nec egestas quam.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*3),
        description: 'Curabitur eu consectetur nisi, non congue velit. Vestibulum id nibh pellentesque sem accumsan gravida vel in dolor. Fusce in semper augue...',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageKey: "news/bddec2cd-e6f1-4be1-9539-b43fc1d87fa5",
      },
      {
        title: 'Mauris non felis nisl. Nulla facilisi. Nullam nec egestas quam.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*4),
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaqu...',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageKey: "news/bc558cb7-1309-4d78-b52d-8f813efa7d31",
      },
      {
        title: 'Ut volutpat nibh eget dolor sodales, ac pharetra nibh scelerisque.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*6),
        description: 'Donec fringilla, felis a rhoncus convallis, sapien ex ultrices lorem, aliquam pulvinar leo eros quis magna. Etiam fermentum mi... ',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageKey: "news/8db2658c-0bfe-4194-94e1-4a2c157044cb",
      },
      {
        title: 'Fusce vel lobortis enim, sit amet pellentesque risus.',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)*7),
        description: 'Proin sit amet nisl vel est fermentum malesuada nec vitae orci. In commodo odio eget elementum pretium. Donec maximus diam laoreet ligula commodo...',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageKey: "news/1d17f2be-996d-4d06-9c9e-3afbfae9f6ac",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news', null, {})
  }
};
