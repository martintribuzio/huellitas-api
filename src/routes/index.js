import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("HUELLITAS API");
});

fs.readdir('./src/routes', (err, routes) => {
    routes.forEach( async route => {
        if(route == 'index.js') return
        try {
            const prefix = route.slice(0, route.indexOf("Routes"));
            const fn = await import(`./${route}`);
            
            router.use(`/${prefix}`, fn.default)
        }catch(error) {
            console.log(error);
        }
    })
});

export default router