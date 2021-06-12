var ChatRoom = require("../model/chatroom");

module.exports.getAllRoom = async (req,res) => {
    let room = await ChatRoom.find()
    .populate({path : "userID"})
    .exec();
    res.json(room);
}

module.exports.getChatRoomByID = async (req, res) => {4
    let userID = req.body.userID;
    await ChatRoom.findOne({userID : userID })
    .populate({ path: "userID" })
    .then((chatroom)=> {
        res.json(chatroom);
    })
    .catch((err)=> {
        res.status(400).send(err);
    })
}
module.exports.createChatRoom = async (req, res) => {
    try {
        const {
            userID
        } = req.body;
        const findUser = await User.findById(userID);

        if (findUser.chatRoomID !== null) {
            return res.status(400).json({
                error: "",
                message: "chat room is exists"
            })
        }
        const chatRoom = await ChatRoom.create(req.body);
        await User.findByIdAndUpdate(userID, {
            $set: {
                chatRoomID: chatRoom._id
            }
        })
        res.status(200).json({
            data: chatRoom,
            message: "add chat room successfully"
        })
    } catch (error) {
        console.log(error, '[error]');
        res.status(400).json({
            error
        })
    }

}