const express = require("express");
const customerController = require("../controller/customer.controller");
const router = express.Router();


router.get("/get-customer" ,customerController.getCustomer);
router.post("/create-customer", customerController.createCustomer);
module.exports = router;