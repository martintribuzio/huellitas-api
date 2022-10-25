import { body, validationResult } from 'express-validator'
import Subscription from '@models/Subscription'

// Validators : https://github.com/validatorjs/validator.js#validators

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
        return next()
    }

    const { msg, param } = errors.errors[0];

    return res.status(400).send({
        message: msg,
        field: param,
        code: 'validation_error'
    })
}

export const createRules = () => {
    return [
        body('user_id').isLength({ min: 1 }).withMessage('El usuario es requerido'),
        body('endpoint').isLength({ min: 1 }).withMessage('El endpoint es requerido'),
        body('keys').custom((value, { req }) => {
            const { keys } = req.body;
            if(!keys || !keys.p256dh || !keys.auth) {
                throw new Error('Las claves son requeridas');
            }
            return true
        })
    ]
}