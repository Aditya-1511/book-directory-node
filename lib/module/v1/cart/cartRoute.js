const router = require("express").Router();
const requestIp = require("request-ip");

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const cartFacade = require("./cartFacade");
const cartValidators = require("./cartValidators");

const constant = require("../../../constant");
//==============================================================

router
  .route("/addToCart")
  .post(
    [middleware.authenticate.autntctTkn, cartValidators.validateDetails],
    function (req, res) {
      let { user } = req;
      let { bookId, quantity } = req.body;
      cartFacade
        .addToCart({ user, bookId, quantity })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

router
  .route("/removeFromCart")
  .delete(
    [middleware.authenticate.autntctTkn],
    function (req, res) {
      let { user } = req;
      let { cartId } = req.body;
      cartFacade
        .removeFromCart({ user, cartId })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

router
  .route("/myCartItems")
  .get(
    [middleware.authenticate.autntctTkn],
    function (req, res) {
      let { user, page, limit } = req;
      cartFacade
        .myCartItems({ user, page, limit })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

module.exports = router;
