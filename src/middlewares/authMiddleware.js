import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '@configs';

const exceptURL = ['/api/auth/login', '/api/auth/register', '/api/'];

export default function(req, res, next) {
    try {
        const url = req.originalUrl;
        if(exceptURL.includes(url)) return next();

        const authHeader = req.headers.authorization;
        const bearer = authHeader?.indexOf("Bearer") !== 0;

        if(!authHeader || typeof authHeader !== 'string' || bearer) throw new createError.Unauthorized("Invalid authorization header", { code: "unauthorized" });

        const token = authHeader?.split(' ')[1];
        if(!token) throw new createError.Unauthorized("Invalid token", { code: "unauthorized" });

        const { id, email } = jwt.verify(token, config.jwtVerifyKey, { algorithm: ["RS256"] });
        req.user = { id, email }
        
        next();
    } catch(error){
        if(createError.isHttpError(error)) {
            const { status, message, code } = error;

            res.status(status).send({ message, code });
        }else {
            console.log(error);
            res.status(500).send({
                message: error.message,
                code: 'unauthorized'
            });
        }   
        
    }
}