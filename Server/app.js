require("dotenv").config();

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
const userRouter = require("./router/router.user");
const transportRouter = require("./router/router.transport");
const employeeRouter = require("./router/router.employee");
const authRouter = require("./router/router.auth");
const cartRouter = require("./router/router.cart");
const storageRouter = require("./router/router.storages");
const chatRouter = require("./router/router.chat");
const customerRouter = require("./router/router.customer");

const Message = require("./model/message");
const ChatRoom = require("./model/chatroom");

const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const verifyToken = require("./middleware/auth");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    const port = process.env.PORT || 9000;
    app.use(cors({
        origin: 'http://localhost:3000'
    }
    ));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(express.static("public/uploads/"));
    app.use(morgan("dev"));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'somesecret',
        cookie: { maxAge: 60000 }
    }))

    app.get("/", (req, res) => {
        res.render("index.html");
    });

    app.use("/api/storages", storageRouter);
    app.use("/api", authRouter);
    app.use("/api", verifyToken, cartRouter);
    app.use("/api/tour", verifyToken, tourRouter);
    app.use("/api/user", verifyToken, userRouter);
    app.use("/api/transport", verifyToken, transportRouter);
    app.use("/api/employee", verifyToken, employeeRouter);
    app.use("/api/chat/", verifyToken, chatRouter)
    app.use("/api/customer/", verifyToken, customerRouter)


    //create connect between client & server
    io.on("connection", (socket) => {
        console.log("user connected", '["user connected"]');

        socket.on("disconnect", () => {
            console.log("user disconnected", '["user disconnected"]');
            console.log(socket.id, '[disconnected]');
        })
        // server listen data from client
        socket.on("newMessage-client-sent", dataNewMessage => {
            io.emit("newMessage-server-sent", {
                data: dataNewMessage,
                id: socket.id
            });

            let userIDSendMsg = dataNewMessage.userID;

            /* 
            // 1 - client || 0 : admin
                client: 	userID: currentUserId,
                clientId: currentUserId,
                message: messageInput,
                role:1

            --- admin : 
                userID: id,
                adminId: currentAdminId,
                message: messageInput,
                chatroomId,
                role: 0
            */

            findChatExist = async () => {
                let userIDExists = await ChatRoom.findOne({ userID: userIDSendMsg }); // -> find key temp

                let chatroomExists = await ChatRoom.findOne({ _id: dataNewMessage.chatRoomId })

                if (userIDExists  || chatroomExists) {
                    const flag = dataNewMessage.role === 1  ? dataNewMessage.clientId  : dataNewMessage.adminId;
                    console.log(flag)
                    await ChatRoom.findOneAndUpdate({ userID: userIDSendMsg }, {
                        $push: {
                            message: {
                                userID: flag,
                                content: dataNewMessage.message
                            }
                        }
                    })
                } else {
                    await ChatRoom.create({
                        userID: userIDSendMsg,
                        message: [
                            {
                                userID: userIDSendMsg,
                                content: dataNewMessage.message
                            }
                        ]
                    })
                }
            }
            findChatExist();
        })
        socket.on('sendMessage', (message, callback) => {
            callback();
        });
    })

    PORT.listen(port, () => {
        console.log("app is running with port " + port);
    });
});

module.exports = app;
