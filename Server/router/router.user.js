const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();
const multer = require("multer");
const { hasAdmin } = require("../middleware/permission");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload =  multer({storage : storage});
//get all user
router.get("/get-all-user", userController.getAllUser);
router.get("/get-me", userController.getMe)
//add user
router.post("/add-user",upload.single("avatar"), userController.addUser);
//get user with id
router.get("/get-userID/:userID", userController.getUserID);
//update user
router.put("/update-user/:userID",upload.single("avatar") , userController.updateUser);
//delete user   
router.delete("/delete-user/:userID", hasAdmin ,userController.deleteUser);

module.exports = router;