var express = require("express");
var router = express.Router();

const userRoute = require("./user/userRoute");
const bookRoute = require("./book/bookRoute");
const cartRoute = require("./cart/cartRoute");
const orderRoute = require("./order/orderRoute");

//========================== Export Module Start ==========================

//API version 1
router.use("/user", userRoute);
router.use("/book", bookRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);

module.exports = router;
//========================== Export Module End ============================
