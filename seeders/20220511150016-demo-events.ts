'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('events', [
      {
        name: 'AUTO.RIA Race',
        date: new Date(),
        place: 'Kharkiv. Maidan constitution',
        discipline: 'Digital motorsport.',
        status: 'National Seria',
        series: 'National Digital Time Attack Series (NS-CTA) 2022',
        costOfParticipation: '50$',
        eventInfo:
          'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. ',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Honda Indy Grand Prix of Alabama',
        date: new Date('2022-04-30'),
        place: 'Barber Motorsports Park',
        discipline: 'IndyCar',
        status: 'National Seria',
        series: 'FIA WORLD ENDURANCE CHAMPIONSHIP 2022',
        costOfParticipation: '200$',
        eventInfo:
          'Pellentesque gravida maximus sem vitae gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla mollis lectus sit amet turpis mattis semper. Sed ipsum odio.',
        statusProgress: 'Finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'The NoBurgerring 7 hour 2022',
        date: new Date('2022-10-07'),
        place: 'Amaroo Circuit',
        discipline: 'Nascar Cup Series',
        status: 'Quisque pulvinar',
        series: 'Ut vulputate tortor vitae sem sagittis commodo.',
        costOfParticipation: '120$',
        eventInfo:
          'Nunc nulla ante, porta eu rutrum sed, iaculis et lacus. Praesent tortor eros, porta nec venenatis vel, elementum ut nulla. Aenean auctor, nisl nec consectetur interdum, risus quam ultrices turpis.',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Goodyear 400',
        date: new Date('2022-03-07'),
        place: 'Darlington Raceway',
        discipline: 'Nascar Cup Series',
        status: 'Praesent pharetra',
        series: 'Nunc quis risus imperdiet mi egestas ultricies.',
        costOfParticipation: '210$',
        eventInfo:
          'Cras elementum finibus nunc ut rutrum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In suscipit porttitor leo id mattis. Phasellus ex dui, feugiat id.',
        statusProgress: 'Finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'GMR Grand Prix',
        date: new Date('2023-03-08'),
        place: 'Indianapolis Motor Speedway',
        discipline: 'IndyCar',
        status: 'Nam sed dapibus dui',
        series: 'Mauris rutrum dictum lectus sit amet aliquet.',
        costOfParticipation: '210$',
        eventInfo:
          'Integer eleifend scelerisque mauris a efficitur. Morbi luctus, enim vel faucibus ultricies, sem arcu dapibus magna, in gravida justo arcu et est. Mauris eget mauris sed lacus venenatis efficitur.',
        statusProgress: 'Finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AdventHealth 400',
        date: new Date(),
        place: 'Kansas Speedway',
        discipline: 'Nascar Cup Series',
        status: 'Praesent molestie',
        series: 'Class aptent taciti sociosqu ad litora',
        costOfParticipation: '190$',
        eventInfo:
          'Etiam sodales, purus at rutrum ultricies, elit justo volutpat tellus, sit amet tempor est eros sed velit. Pellentesque laoreet eleifend justo sed imperdiet. Phasellus hendrerit mi orci, vitae posuere lorem lobortis vitae.',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SpeedyCash.com 220',
        date: new Date(Date.now() + ( 3600 * 1000 * 24)),
        place: 'Texas Motor Speedway',
        discipline: 'Nascar Truck Series',
        status: 'Aliquam mi sapien',
        series: 'Etiam sollicitudin, justo id imperdiet viverra',
        costOfParticipation: '500$',
        eventInfo:
          'Suspendisse arcu dui, blandit et tortor rhoncus, mollis eleifend tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vehicula nulla et varius sollicitudin.',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'MotoAmerica Superbikes',
        date: new Date(Date.now() + ( 3600 * 1000 * 24)*2),
        place: 'Virginia International Raceway',
        discipline: 'Moto1',
        status: 'Curabitur molestie',
        series: 'Cras at ultrices metus, sit amet tristique ligula',
        costOfParticipation: '300$',
        eventInfo:
          'Maecenas lectus odio, dapibus at dignissim at, posuere in purus. Nunc vel malesuada ex, vel gravida ex. Cras euismod erat quis ex tristique posuere. Nam sed dapibus dui, finibus maximus quam.',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SRS Distribution 250',
        date: new Date(Date.now() + ( 3600 * 1000 * 24)*4),
        place: 'Texas Motor Speedway',
        discipline: 'Nascar Xfinity Series',
        status: 'Nulla faucibus diam',
        series: 'In pulvinar facilisis urna, ut tempus justo',
        costOfParticipation: '80$',
        eventInfo:
          'Maecenas nec suscipit est, vel pretium diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam pellentesque condimentum volutpat.',
        statusProgress: 'Upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'NASCAR All-Star Race',
        date: new Date(Date.now() - ( 3600 * 1000 * 24)),
        place: 'Texas Motor Speedway',
        discipline: 'Nascar Cup Series',
        status: 'Fusce sit amet',
        series: 'Vestibulum vel ornare nulla',
        costOfParticipation: '1200$',
        eventInfo:
          'Donec eu egestas nulla. Nam orci magna, bibendum at tortor porttitor, faucibus luctus est. Nam sed lacus quis elit facilisis viverra. Donec massa neque, vulputate in luctus a, auctor tempor leo. Integer nibh neque.',
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
