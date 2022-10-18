import authService from '@services/authService'
import setCookie from '@utils/setCookie';

const AuthService = new authService();
class AuthController {
    static async register(req, res, next) {
        try {
            const data = req.body;
            await AuthService.register(data);

            res.sendStatus(200);
        } catch(error) {
            next(error);
        }   
    }

    static async login(req, res, next) {
        try {
            const data = req.body;
            const result = await AuthService.login(data);
            
            return setCookie(result, res)
        } catch(error) {
            next(error);
        }
    }
}

export default AuthController;