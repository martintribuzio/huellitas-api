import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    databaseURL: process.env.DATABASE_URL,
    enviroment: process.env.ENVIROMENT
}

export default config