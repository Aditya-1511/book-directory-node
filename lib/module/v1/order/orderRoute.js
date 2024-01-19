const router = require("express").Router();
const requestIp = require("request-ip");

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const orderFacade = require("./orderFacade");
const orderValidators = require("./orderValidators");

const constant = require("../../../constant");
//==============================================================

router
    .route("/placeOrder")
    .post(
        [middleware.authenticate.autntctTkn, orderValidators.validatePlaceOrderDetails],
        function (req, res) {
            let { user } = req;
            let { cartId, quantity } = req.body;
            orderFacade
                .placeOrder({ user, cartId, quantity, bookId })
                .then(function (result) {
                    resHndlr.sendSuccess(res, result, req);
                })
                .catch(function (err) {
                    resHndlr.sendError(res, err, req);
                });
        }
    );

router
    .route("/list/getParticularUserOrders")
    .get(
        [middleware.authenticate.autntctTkn],
        function (req, res) {
            let { user } = req;
            orderFacade
                .getParticularUserOrders({ user })
                .then(function (result) {
                    resHndlr.sendSuccess(res, result, req);
                })
                .catch(function (err) {
                    resHndlr.sendError(res, err, req);
                });
        }
    );

module.exports = router;
