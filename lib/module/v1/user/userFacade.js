"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require("ip");
var vCardsJS = require("vcards-js");
//========================== Load internal modules ====================

const userService = require("./userService");
const userMapper = require("./userMapper");

const appUtils = require("../../../appUtils");
const redisSession = require("../../../redisClient/session");
const customException = require("../../../customException");
const emailService = require("../../../service/sendgrid_email");
const constant = require("../../../constant");
const config = require("../../../config");
const { response } = require("express");
const { Service } = require("aws-sdk");
const { generate } = require("randomstring");
const otpGenerator = require("otp-generator");
const bookService = require("../book/bookService");

//========================== Load Modules End ==============================================

function create(params) {
  console.log(params,"-------params in facade")
  return userService
    .isEmailExist(params)
    .then(function (result) {
      if (result) {
        throw customException.alreadyRegistered();
      } else {
        params.OTP = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
          digits: true,
        });
        let emailInfo = {};
        emailInfo.OTP = params.OTP;
        emailInfo.name = params.firstName;
        emailInfo.subject = "One Time Password";
        emailInfo.template = "validateOTP.ejs";
        emailInfo.email = params.email;
        emailService.sendEmail(emailInfo);
      }
      return userService.createUser(params);
    })
    .bind({})
    .then(function (user) {
      return userMapper.createMapping({ user: user });
    })
    .catch(function (err) {
      throw err;
    });
}

function _buildUserTokenGenObj(user) {
  var userObj = {};
  userObj.userId = user._id.toString();
  userObj.email = user.email;
  userObj.password = user.password;
  return userObj;
}

function userLogin(params) {
  let user;
  return userService
    .isEmailExist(params)
    .then((userExist) => {
      if (userExist) {
        user = userExist;
        let password = appUtils.createHashSHA256(params.password);
        if (userExist.password === password) {
          let tokenObj = _buildUserTokenGenObj(userExist);
          let userToken = {
            userId: userExist._id.toString(),
            userObj: tokenObj,
            ip: ip.address(),
          };
          return redisSession.create(userToken);
        } else {
          throw customException.incorrectPass();
        }
      } else {
        throw customException.userNotFound()
      }
    })
    .then((userExist) => {
      delete user["password"];
      return userMapper.loginMapping({
        user: user,
        accessToken: userExist.token,
      });
    });
}

function validateOTP(params) {
  return userService.isUserExist(params).then((result) => {
    if (result) {
      return userService.validateOTP(params);
    }
    return userMapper.validateOTP({
      message: "OTP has been validated successfully",
    });
  });
}

function forgotPassword(params) {
  return userService
    .isEmailExist(params)
    .then((userExist) => {
      if (userExist) {
        params.OTP = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
          digits: true,
        });
        let emailInfo = {};
        emailInfo.OTP = params.OTP;
        emailInfo.name = userExist.firstName;
        emailInfo.subject = "One Time Password";
        emailInfo.template = "validateOTP.ejs";
        emailInfo.email = params.email;
        emailService.sendEmail(emailInfo);
      } else {
        throw customException.userNotFound();
      }
    })
    .then((result) => {
      return userMapper.forgotPassword({
        message: "OTP has been sent successfully",
      });
    });
}

function resetPassword(params) {
  return userService.resetPassword(params);
}

function editDetails(params) {
  return userService
    .isEmailExist(params)
    .then((userExist) => {
      if (userExist) {
        return userService.editDetails(params);
      } else {
        throw customException.userNotFound();
      }
    })
    .then((result) => {
      return userMapper.editDetails(params);
    });
}

function getUserDetails(params) {
  return userService.getUserDetails(params);
}

function allUsers(params) {
  return userService.allUsers(params);
}

function particularUserBooks(params) {
  return userService.particularUserBooks(params).then((result) => {
    return userMapper.particularUserBooks(result);
  });
}

function userLogout(params) {
  return redisSession.expire(params.accessToken).then((result) => {
    return userMapper.userLogout(result);
  });
}

function deleteAccount(params) {
  return userService.isUserExist({ email: params.user.email })
    .then(userExist => {
      if (userExist) {
        return userService.deleteAccount({ userId: params.user.userId, isDelete: params.isDelete })
      } else {
        throw customException.userNotFound()
      }
    })
    .then(result => {
      return userMapper.deleteAccount({ result: result })
    })
}

//========================== Export Module Start ==============================

module.exports = {
  create,
  userLogin,
  validateOTP,
  forgotPassword,
  resetPassword,
  editDetails,
  getUserDetails,
  allUsers,
  particularUserBooks,
  userLogout,
  deleteAccount
};

//========================== Export Module End ================================
