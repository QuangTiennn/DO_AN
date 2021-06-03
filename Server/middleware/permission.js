const User = require("../model/user");

const hasAdmin = async (req, res, next) => {
    const userID = req.decode.id;
    const user = await User.findOne({
        _id : userID,
        role : "admin"
    });
    if(user === null) {
        return  res.status(400).json({
            error : "",
            message : "not allowed"
        })
    }
    next();
}

module.exports = {
    hasAdmin
}