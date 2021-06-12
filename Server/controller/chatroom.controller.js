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
    let room = new ChatRoom(req.body);
    let userIDExists = room.userID;
    //check room exists ?
    let checkRoomExists = await ChatRoom.findOne({userID : userIDExists})
    if(!checkRoomExists){
        room.save()
        .then((room)=> {
            res.json(room);
        })
        .catch((err)=>{
            console.log(err, '[err]');
        })
    }else{
        res.json({
            message : "room is already!"
        })
    }
}
