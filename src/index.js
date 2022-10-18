import express, { json } from 'express';
import helmet from 'helmet';
import knex from 'knex';
import { Model } from 'objection';

import routes from '@routes';
import config from '@configs'
import knexConfig from '../knexfile';
import errorHandler from '@middlewares/errorHandler';

const PORT = config.port || 8080
const server = express();
const Knex = knex(knexConfig[config.enviroment]);

Model.knex(Knex);

// MIDDLEWARES
server.use(helmet());
server.use(json());

// ROUTES
server.get('/', (req, res) => {
    res.send("HUELLITAS API");
});

server.use('/api', routes);
server.use(errorHandler);

//INIT
server.listen(PORT, () => {
    console.log("SERVER LISTEN ON PORT " + PORT)
});