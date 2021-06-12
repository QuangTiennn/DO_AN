var mongoose = require("mongoose");

var ChatRoomSchema = mongoose.Schema({
    type: {}, //group || 1 - 1
    userID: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        trim : true
    },
    message: [
        {
            userID: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                trim : true
            },
            content: String,
            timeSend: {
                type : Date,
                default : Date.now
            }
        }
    ],
    roomMaster : {
        type: String,
        default : "admin"
    }
})

var ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema, "chatrooms");
module.exports = ChatRoom;