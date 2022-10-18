const buildDate = (days) => {
    return new Date(new Date().setDate(new Date().getDate() + days));
};

const setLocalCookie = ({ user, token }, res) => {
    return res
        .cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            expires: buildDate(7),
            secure: false,
        })
        .status(200)
        .send({ user });
};

export default setLocalCookie