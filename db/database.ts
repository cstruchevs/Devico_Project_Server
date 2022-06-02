import { Sequelize } from "sequelize";

const sequelize = new Sequelize('devico_project', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;
