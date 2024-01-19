//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../../../appUtils");
var constant = require("../../../constant");
var exceptions = require("../../../customException");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

var validateDetails = function (req, res, next) {
  var { bookId } = req.body;
  var {} = req.headers;
  var errors = [];
  if (_.isEmpty(bookId)) {
    errors.push({
      fieldName: "bookId",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "bookId"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

module.exports = {
  validateDetails,
};
//========================== Export module end ==================================
