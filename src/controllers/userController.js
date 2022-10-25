import userService from '@services/userService'

const UserService = new userService();
class userController {
    static show(req, res) {
        const { user } = req;

        res.send(user);
    }
}

export default userController