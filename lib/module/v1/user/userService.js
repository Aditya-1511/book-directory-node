"use strict";

const { ObjectId } = require("mongodb");
//========================== Load Modules Start =======================
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const userDao = require("./userDao");

//========================== Load Modules End ==============================================

function createAdmin(params) {
  return userDao.getByKey({ email: params.email }).then(function (result) {
    if (!result) {
      return userDao.createUser(params);
    } else {
      return result;
    }
  });
}

function createUser(params) {
  console.log(params,"-------params in service")
  return userDao.createUser(params);
}

function isEmailExist(params) {
  return userDao.isEmailExist(params);
}

function validateOTP(params) {
  return userDao.validateOTP(params);
}

function isUserExist(params) {
  return userDao.getByKey({ email: params.email });
}

function resetPassword(params) {
  return userDao.resetPassword(params);
}

function editDetails(params) {
  return userDao.editDetails(params);
}

function getUserDetails(params) {
  return userDao.getByKey({ _id: params.user.userId });
}

function allUsers(params) {
  return userDao.allUsers(params);
}

function particularUserBooks(params) {
  return userDao.particularUserBooks(params);
}

function deleteAccount(params) {
  return userDao.deleteAccount(params);
}

function updateOrderInfo(params) {
  return userDao.updateOrderInfo(params);
}

//========================== Export Module Start ==============================

module.exports = {
  createAdmin,
  createUser,
  isEmailExist,
  validateOTP,
  isUserExist,
  resetPassword,
  editDetails,
  getUserDetails,
  allUsers,
  particularUserBooks,
  deleteAccount,
  updateOrderInfo
};

//========================== Export Module End ===============================
