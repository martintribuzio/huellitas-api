import { genSalt, hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import config from '@configs'
import User from '@models/User';
import createError from 'http-errors';
class AuthService {
    async register({ email, password }) {

        password = await this.#encrypt(password);
        
        const user = await User.transaction(async trx => {
            return await User.query(trx).insert({ email, password })
        })

        return user
    }

    async login({ email, password }) {
        const [ user ] = await User.query().where('email', '=', email);

        if(!user) throw new createError.NotFound("El email ingresado no pertenece a ningun usuario", { code: "invalid_email" })
       
        const validPassword = await this.#compare(password, user.password)

        if(!validPassword) throw new createError.Unauthorized("La contraseña es incorrecta", { code: "invalid_password" })

        return this.#buildUserData(user);
    }

    #buildUserData(user) {
        const data = {
            id: user.id,
            email: user.email,
        }
        const token = this.#getToken(data)
        return { user: data , token }
    }

    async #encrypt(password) {
        const salt = await genSalt(10)
        return await hash(password, salt)
    }

    async #compare(password, passwordEncrypt) {
        return await compare(password, passwordEncrypt)
    }

    #getToken(user) {
        return sign(user, config.jwtSecret, { expiresIn: '2d' })
    }
}

export default AuthService