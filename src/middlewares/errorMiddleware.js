import createError from 'http-errors';
import handleDBErrors from '@utils/handleDBErrors';

export default function(error, req, res, next) {
    if(createError.isHttpError(error)) {
        const { status, message, code } = error;

        res.status(status).send({ message, code });
        return
    }

    const DbError = handleDBErrors(error);
   
    if(DbError) {
        const response = { message: DbError.message, code: DbError.type }
        res.status(DbError.status).send(response)
        return 
    }else {
        console.log(error);
        res.status(500).send({
            message: error.message,
            code: 'unknown_error'
        });
    }
}

