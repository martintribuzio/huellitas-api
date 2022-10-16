import authService from '@services/authService'

class AuthController {

    static async register(req, res) {
        res.send("REGISTER");
    }

    static async login(req, res) {
        res.send("LOGIN");
    }
}

export default AuthController;