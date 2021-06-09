var mongoose = require("mongoose");

var ChatRoomSchema = mongoose.Schema({
    type: {}, //group || 1 - 1
    userID: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    messageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    roomMaster: {
        type: String
    }
})

var ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema, "chatrooms");
module.exports = ChatRoom;