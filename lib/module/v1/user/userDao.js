"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const userModel = require("./userModel");

// init user dao
let BaseDao = require("../../../dao/baseDao");
const { update } = require("lodash");
const userDao = new BaseDao(userModel);

//========================== Load Modules End ==============================================

function createUser(params) {
  console.log(params,"-------params in dao")
  if (params.password) {
    params.password = appUtils.createHashSHA256(params.password);
  }
  if (params.confirmPassword) {
    params.confirmPassword = appUtils.createHashSHA256(params.confirmPassword);
  }
  if (params.password === params.confirmPassword) {
    var user = new userModel(params);
    return userDao.save(user);
  }
}

function getByKey(query) {
  return userDao.findOne(query);
}

function isEmailExist(params) {
  let query = {};
  query.email = params.email;
  return userDao.findOne(query);
}

function validateOTP(params) {
  let pipeline = [];
  pipeline.push({
    $match: {
      OTP: params.OTP,
    },
  });
  return userDao.aggregate(pipeline);
}

function resetPassword(params) {
  let query = {};
  query.email = params.email;
  if (params.password) {
    params.password = appUtils.createHashSHA256(params.password);
  }
  if (params.confirmPassword) {
    params.confirmPassword = appUtils.createHashSHA256(params.confirmPassword);
  }
  if (params.password === params.confirmPassword) {
    let update = {
      $set: {
        password: params.password,
        confirmPassword: params.confirmPassword,
      },
    };
    let options = {};
    options.new = true;
    return userDao.findOneAndUpdate(query, update, options);
  }
}

function editDetails(params) {
  let query = {};
  query.email = params.email;
  let update = {
    $set: {
      firstName: params.firstName,
      lastName: params.lastName,
      dob: params.dob,
      phoneNo: params.phoneNo,
      gender: params.gender,
      aboutUs: params.aboutUs,
    },
  };
  let options = {};
  options.new = true;
  return userDao.findOneAndUpdate(query, update, options);
}

function allUsers(params) {
  let pipeline = [];
  pipeline.push({
    $match: {
      isDelete: 0,
    },
  });
  return userDao.aggregate(pipeline);
}

function particularUserBooks(params) {
  let pipeline = [];
  pipeline.push({
    $match: {
      _id: mongoose.Types.ObjectId(params.userId),
    },
  });

  pipeline.push({
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "bookData",
    },
  });

  pipeline.push({
    $unwind: { path: "$bookData", preserveNullAndEmptyArrays: true },
  });

  pipeline.push({
    $group: {
      _id: "$bookData._id",
      bookName: { $first: "$bookData.bookName" },
      authorName: { $first: "$bookData.authorName" },
      isbnNum: { $first: "$bookData.isbnNum" },
      costPrice: { $first: "$bookData.costPrice" },
    },
  });

  return userDao.aggregate(pipeline);
}

function deleteAccount(params) {
  let query = {}
  query._id = params.userId
  let update = {}
  update = {
    $set: {
      isDelete: parseInt(params.isDelete)
    }
  }
  let options = {}
  options.new = true
  return userDao.find(query);
}

function updateOrderInfo(params) {
  let query = {};
  query.email = params.user.email;
  let update = {
    $push: {
      bookId: params.bookId
    },
  };
  let options = {};
  options.new = true;
  return userDao.findOneAndUpdate(query, update, options);
}

//========================== Export Module Start ==============================

module.exports = {
  createUser,
  getByKey,
  isEmailExist,
  validateOTP,
  resetPassword,
  editDetails,
  allUsers,
  particularUserBooks,
  deleteAccount,
  updateOrderInfo
};

//========================== Export Module End ===============================
