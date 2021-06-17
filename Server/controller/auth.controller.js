var User = require("../model/user");
var jwt = require('jsonwebtoken');
module.exports.login = async (req, res) => {
    try {
        var email = req.body.txt_userName;
        var password = req.body.txt_password;
        var user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                err: "email and password is incorrect!",
                code: 401
            })
        }
        if (user.password !== password) {
            return res.status(400).json({
                error,
                message: "email and password is incorrect!"
            })
        }
        let accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET);
        let refreshToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '7d' })
        const decode = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET);
        res.json({
            code: 200,
            expiresIn: 60 * 60,
            expiresInRefToken: 60 * 60 * 24 * 7,
            user: user,
            refreshToken,
            accessToken
        })
    } catch (error) {
        res.status(400).json({
            error,
            message: "email and password is incorrect!"
        })
    }
}

module.exports.register = async (req, res) => {
    try {
        let user = new User(req.body);
        req.body.avatar = req.file.filename;
        await User.create(req.body);
        res.status(200).json({
            data: user,
            message: "register successfully"
        })
    } catch (error) {
        res.status(400).json({
            error,
            message: "register fail"
        })
    }
}
