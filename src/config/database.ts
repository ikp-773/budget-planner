import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5336,
});

export default sequelize;
