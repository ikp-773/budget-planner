import express from 'express';
import routes from './routes';
import sequelize from './config/database';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', routes);

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
