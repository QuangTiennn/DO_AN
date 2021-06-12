require ("dotenv").config();

const express = require("express");
const app = express();
const PORT = require("http").createServer(app);
const io = require("socket.io")(PORT, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

const tourRouter = require("./router/router.tour");
const userRouter =  require("./router/router.user");
const transportRouter = require("./router/router.transport");
const employeeRouter = require("./router/router.employee");
const authRouter = require("./router/router.auth");
const cartRouter = require("./router/router.cart");
const storageRouter = require("./router/router.storages");
const chatRouter = require("./router/router.chat");
const customerRouter = require("./router/router.customer");

const ChatRoom = require("./model/chatroom");

const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function(){
    const port = process.env.PORT || 9000;
    app.use(cors({
        origin: 'http://localhost:3000'
    }
    ));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(
        bodyParser.urlencoded({
            extended : true
        })
    );

    app.use(express.static("public"));
    app.use(morgan("dev"));
    app.use(session({
        resave: true, 
        saveUninitialized: true, 
        secret: 'somesecret', 
        cookie: { maxAge: 60000 }
    }))

    app.get("/",(req,res)=> {
        res.render("index.html");
    });

    app.use("/api", authRouter);
    app.use("/api", cartRouter);
    app.use("/api/tour", tourRouter);
    app.use("/api/user",userRouter);
    app.use("/api/transport", transportRouter);
    app.use("/api/employee", employeeRouter);
    app.use("/api/storages", storageRouter);
    app.use("/api/chat/", chatRouter)
    app.use("/api/customer/", customerRouter)

    

    //create connect between client & server
    io.on("connection", (socket) => {
        console.log("user connected", '["user connected"]');

        socket.on("disconnect", () => {
            console.log("user disconnected", '["user disconnected"]');
            console.log(socket.id, '[disconnected]');
        })
        // server listen data from client
        socket.on("newMessage-client-sent", dataNewMessage => {
            console.log(dataNewMessage, '[dataNewMessage]');
            //server send data to client
            io.emit("newMessage-server-sent",{
                data : dataNewMessage, 
                id : socket.id
            });
            // let chatroom = new ChatRoom({
            //     userID : dataNewMessage.userID,
            //     messages : dataNewMessage.data
            // });

            // dataNewMessage: {
            //     userID : 123,
            //     message : aaaaa
            // }
            let userIDSendMsg = dataNewMessage.userID;
            findChatExist = async() => {
                let userIDExists = await ChatRoom.findOne({userID : userIDSendMsg})
                if(userIDExists) {
                    await ChatRoom.findOneAndUpdate({userID : userIDSendMsg}, {
                        $push : {
                            messages : dataNewMessage.data
                        }
                    })
                } else {
                    await ChatRoom.create({
                        userID: userIDSendMsg,
                        message: [
                            {
                                userID: userIDSendMsg,
                                content : dataNewMessage.message
                            }
                        ]
                    })
                }
            }
            findChatExist();
            //create chatroom
            // createChatRoom = async () => {
            //     let room = new ChatRoom({
            //         messageID : message._id ,
            //         userID : dataNewMessage.userID,
            //         roomMaster : "Admin"
            //     });
            //     let userIDExists = room.userID;
            //     //check room exists ?
            //     let checkRoomExists = await ChatRoom.findOne({userID : userIDExists})
            //     if(!checkRoomExists){
            //         room.save((err)=> {
            //             if(err) console.log(err, '[err]');
            //         })
            //     }else{
            //         ChatRoom.findByIdAndUpdate({userID : userIDExists}, {
            //             $push: {
            //                 messageID : [{
            //                     messageID : message._id
            //                 }],
            //                 userID : [{
            //                     userID : dataNewMessage.userID
            //                 }]
            //             }
            //         })
            //         console.log("room already", '["room already"]');
            //     }
            // }
            // createChatRoom();
        })  
        
        socket.on('sendMessage', (message,callback) => {
            callback();
        });
    })

    PORT.listen(port,()=>{
        console.log("app is running with port " + port);
    });
});

module.exports = app;
