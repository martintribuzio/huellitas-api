import express, { json } from 'express';
import helmet from 'helmet';
import knex from 'knex';
import cors from 'cors';
import webpush from 'web-push';
import { Model } from 'objection';

import routes from '@routes';
import config from '@configs'
import knexConfig from '../knexfile';
import errorMiddleware from '@middlewares/errorMiddleware';
import authMiddleware from '@middlewares/authMiddleware';

const PORT = config.port || 8080
const server = express();
const Knex = knex(knexConfig[config.enviroment]);

webpush.setVapidDetails(
    'mailto:martintribuzio@protonmail.com',
    config.vapidPublicKey,
    config.vapidPrivateKey,
);

Model.knex(Knex);

// MIDDLEWARES
server.use(helmet());
server.use(json());
server.use(cors())
server.use(authMiddleware)


// ROUTES
server.get('/api/', (req, res) => {
    res.send("HUELLITAS API");
});

server.use('/api', routes);

// ENDWARES
server.use(errorMiddleware);

// INIT
server.listen(PORT, () => {
    console.log("SERVER LISTEN ON PORT " + PORT)
});