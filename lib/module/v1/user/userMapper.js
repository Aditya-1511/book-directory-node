/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require("../../../config");

function loginMapping(params) {
  let userInfo = {};
  userInfo._id = params.user._id;
  userInfo.firstName = params.user.firstName;
  userInfo.lastName = params.user.lastName;
  userInfo.email = params.user.email;
  userInfo.gender = params.user.gender;
  userInfo.dob = params.user.dob;
  userInfo.aboutUs = params.user.aboutUs;
  userInfo.phoneNo = params.user.phoneNo;
  userInfo.profileImage = params.user.profileImage;

  var respObj = {
    message: "Successfully Login",
    accessToken: params.accessToken,
    result: userInfo,
  };
  return respObj;
}

function createMapping(params) {
  let userInfo = {};
  userInfo._id = params.user._id;
  userInfo.firstName = params.user.firstName;
  userInfo.lastName = params.user.lastName;
  userInfo.email = params.user.email;
  userInfo.gender = params.user.gender;
  userInfo.dob = params.user.dob;
  userInfo.aboutUs = params.user.aboutUs;
  userInfo.phoneNo = params.user.phoneNo;
  userInfo.profileImage = params.user.profileImage;

  var respObj = {
    message: "User Created Successfully",
    result: userInfo,
  };
  return respObj;
}

function validateOTP(params) {
  var respObj = {
    message: params.message,
  };
  return respObj;
}

function forgotPassword(params) {
  var respObj = {
    message: params.message,
  };
  return respObj;
}

function editDetails(params) {
  let userInfo = params.user;
  if (userInfo.password) {
    delete userInfo.password;
  }
  var respObj = {
    message: "User details updated successfully",
    result: userInfo,
  };
  return respObj;
}

function particularUserBooks(params) {
  var respObj = {
    message: "Book list fetched successfully",
    result: params,
  };
  return respObj;
}

function userLogout(params) {
  var respObj = {
    message: "Successfully Logged Out",
  };
  return respObj;
}

function deleteAccount(params) {
  var respObj = {
    message: "Account deleted successfully",
  };
  return respObj;
}

module.exports = {
  loginMapping,
  createMapping,
  validateOTP,
  forgotPassword,
  editDetails,
  particularUserBooks,
  userLogout,
  deleteAccount
};
