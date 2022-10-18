import { body, validationResult } from 'express-validator'
import User from '@models/User'

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

export const registerRules = () => {
    return [
      body('email').isEmail().withMessage('Debes ingresar un email valido'),
      body('email').custom(async value => {
        const user = await User.query().where('email', '=', value);

        if(user.length) throw new Error('El email ingresado ya existe')
      }),
      body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener mas de 8 caracteres'),
      
    ]
}

export const loginRules = () => {
  return [
    body('email').isEmail().withMessage('Debes ingresar un email valido'),
    body('password').isLength({ min: 1 }).withMessage('La contraseña es requerida')
  ]
}