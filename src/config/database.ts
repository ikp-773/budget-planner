import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'postgres',
    username: 'user',
    password: 'password',
    host: 'localhost',
    dialect: 'postgres',
    port: parseInt('5336', 10),
    logging: false,
});

export default sequelize;
