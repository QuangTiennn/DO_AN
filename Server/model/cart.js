const mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
    // ip : {
    //     type : String,
    // },
    userID : {
        type : String,
        ref : "User"
    },
    tourInCart: [
        {
            tourID: {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Tour"
            }
        }
    ],
    dateCreateCart : {
        type : Date,
        default : Date.now
    },
});

var CartSchema = mongoose.model("Cart", CartSchema , "cart");
module.exports = CartSchema;