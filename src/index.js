import express, { json } from 'express';
import helmet from 'helmet';

import routes from '@routes';
import config from '@configs'


const PORT = config.port || 8080
const server = express();
const router = express.Router()

// MIDDLEWARES
server.use(helmet());
server.use(json());

// ROUTES
server.get('/', (req, res) => {
    res.send("HUELLITAS API");
});

server.use('/api', routes);

//INIT
server.listen(PORT, () => {
    console.log("SERVER LISTEN ON PORT " + PORT)
});