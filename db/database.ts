import { Sequelize } from "sequelize";

const sequelize = new Sequelize('devico_project', 'root', 'semen2012', {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;
