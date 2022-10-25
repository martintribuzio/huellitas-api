import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const config = {
    port: process.env.PORT,
    jwtSignKey: fs.readFileSync(path.join(__dirname, '/private.key'), 'utf8'),
    jwtVerifyKey: fs.readFileSync(path.join(__dirname, '/public.key'), 'utf8'),
    databaseURL: process.env.DATABASE_URL,
    enviroment: process.env.ENVIROMENT,
    corsOrigin: process.env.ENVIROMENT === 'development' ? '*' : [ "https://huellitas-front.vercel.app" ],
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY
}

console.log(config);

export default config