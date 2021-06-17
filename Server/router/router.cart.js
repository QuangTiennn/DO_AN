const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();

router.get("/cart", cartController.getCart);
router.get("/cart/:id", cartController.getCartByUser);
router.post("/add-to-cart", cartController.addToCart);
router.delete("/cart", cartController.deleteCart);

module.exports = router;