//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../../../appUtils");
var constant = require("../../../constant");
var exceptions = require("../../../customException");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

var validateLogin = function (req, res, next) {
  var { email, password } = req.body;
  var { } = req.headers;
  var errors = [];
  email = req.body.email = _.toLower(email);
  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id"),
    });
  } else if (!appUtils.isValidEmail(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.INVALID_EMAIL,
    });
  }

  if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

var validateDetails = function (req, res, next) {
  var { userId } = req.body;
  var { } = req.headers;
  var errors = [];
  if (_.isEmpty(userId)) {
    errors.push({
      fieldName: "userId",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "userId"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};


var validationError = function (errors, next) {
  if (errors && errors.length > 0) {
    return next(
      exceptions.getCustomErrorException(
        constant.MESSAGES.VALIDATION_ERROR,
        errors
      )
    );
  }
  next();
};

var validateSignup = function (req, res, next) {
  var { firstName, lastName, email, password, phoneNo, confirmPassword } = req.body;
  var { } = req.headers;
  var errors = [];
  email = req.body.email = _.toLower(email);
  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id"),
    });
  } else if (!appUtils.isValidEmail(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.INVALID_EMAIL,
    });
  }

  if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password"),
    });
  } else if (password.length > 15) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.INVALID_PASSWORD
    })
  } else if (password.length < 8) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.INVALID_PASSWORD
    })
  }

  if (_.isEmpty(confirmPassword)) {
    errors.push({
      fieldName: "confirmPassword",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Confirm Password"),
    });
  } else if (confirmPassword != password) {
    errors.push({
      fieldName: "confirmPassword",
      message: constant.MESSAGES.PASSWORD_DO_NOT_MATCH
    })
  }

  if (_.isEmpty(firstName)) {
    errors.push({
      fieldName: "firstName",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "firstName"),
    });
  } else if (!appUtils.isValidFirstName(firstName)) {
    errors.push({
      fieldName: "firstName",
      message: constant.MESSAGES.INVALID_NAME,
    });
  }

  if (_.isEmpty(lastName)) {
    errors.push({
      fieldName: "lastName",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "lastName"),
    });
  } else if (!appUtils.isValidLastName(lastName)) {
    errors.push({
      fieldName: "lastName",
      message: constant.MESSAGES.INVALID_NAME,
    });
  }

  if (_.isEmpty(phoneNo)) {
    errors.push({
      fieldName: "phoneNo",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "phoneNo"),
    });
  } else if (!appUtils.isValidNumber(phoneNo)) {
    errors.push({
      fieldName: "phoneNo",
      message: constant.MESSAGES.INVALID_NUMBER,
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

module.exports = {
  validateLogin,
  validateDetails,
  validateSignup,
};
//========================== Export module end ==================================
