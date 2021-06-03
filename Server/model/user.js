const mongoose = require("mongoose");

var userSchema =  new mongoose.Schema({
    userName : {
        type : String,
        trim : true,
    },
    password : { 
        type : String,
        trim : true,
    },
    avatar : {
        type : String
    },
    role : {
        type : String,
        default : "member"
    },
    email : {
        type : String,
        trim : true,
    },
    numberPhoneUser : {
        type : Number,
        trim : true,
    },
    chatRoomID : {
        type : mongoose.Schema.Types.ObjectId,
        default : null
    }
});

var User = mongoose.model("User", userSchema, "users");
module.exports = User;