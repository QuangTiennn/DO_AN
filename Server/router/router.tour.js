const express = require("express");
const router = express.Router();
const tourController = require("../controller/tour.controller");
// const multer = require("multer");
// const upload =  multer({dest : "./uploads",fileFilter : (req,file,cb)=>{
//     console.log("aaaaaaaaaaaaa", '["aaaaaaaaaaaaa"]');
// }});

//get all tour
router.get("/get-all-tour", tourController.getAllTour);
//add tour
// ,upload.single("avatarTour") 
router.post("/add-tour",tourController.addTour);
//get tour id
router.get("/get-tourid/:tourID", tourController.getTourID);
//update tour
// ,upload.single("avatarTour")
router.put("/update-tour/:tourID", tourController.updateTour);
//delete tour
router.delete("/delete-tour/:tourID", tourController.deleteTour);

module.exports = router;