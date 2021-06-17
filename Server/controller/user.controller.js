const User = require("../model/user");

module.exports.getAllUser = async (req, res) => {
    await User.find()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(400).send(err)
        })
};

module.exports.getMe = async (req, res) => {
    try {
        const userID = req.decode.id;
        console.log(userID, '[userID]');
        const user  = await User.findOne({_id : userID});
        res.status(200).json({
            data : user,
            message : "get me successfully"
        })
    } catch (error) {
        res.status(400).json({
            error,
            message : "get me fail"
        })
    }
}

module.exports.addUser = async (req, res) => {
    try {
        let user = new User(req.body);
        req.body.avatar = req.file.filename;
        await User.create(req.body);
        res.status(200).json({
            data : user,
            message : "add user successfully"
        })
    } catch (error) {
        res.status(400).json({
            error,
            message : "add user fail"
        })
    }
};


module.exports.getUserID = (req, res) => {
    let userID = req.params.userID;
    User.findOne({ _id: userID })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

module.exports.updateUser = async (req, res) => {
    let userID  = req.params.userID;
    let updateUser = req.body;
    req.body.avatar = req.file.filename;
    User.findByIdAndUpdate({_id : userID}, {$set : updateUser})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
};

module.exports.deleteUser = (req, res) => {
    let userID = req.params.userID;
    User.findByIdAndDelete({ _id: userID })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}


