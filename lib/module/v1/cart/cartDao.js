"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const cartModel = require("./cartModel");

// init cart dao
let BaseDao = require("../../../dao/baseDao");
const cartDao = new BaseDao(cartModel);

//========================== Load Modules End ==============================================

function addToCart(params) {
  params.userId = mongoose.Types.ObjectId(params.user.userId).toString();
  var cart = new cartModel(params);
  return cartDao.save(params);
}

function isBookExistWithThisUser(params) {
  let query = {};
  query.bookId = mongoose.Types.ObjectId(params.bookId).toString();
  query.userId = mongoose.Types.ObjectId(params.user.userId).toString();
  return cartDao.find(query);
}

function updateQuantityOfBook(params) {
  if (params.quantity > 1) {
  } else {
    params.quantity = 1;
  }
  let query = {};
  query.bookId = mongoose.Types.ObjectId(params.bookId).toString();
  let update = {};
  update = {
    $inc: { quantity: params.quantity },
  };
  let options = {};
  options.new = true;
  return cartDao.findOneAndUpdate(query, update, options);
}

function removeFromCart(params) {
  let query = {}
  query._id = params.cartId
  let options = {}
  options.new = true
  return cartDao.deleteOne(query, options);
}

function isProductExist(params) {
  let query = {};
  query._id = mongoose.Types.ObjectId(params.cartId).toString();
  return cartDao.find(query);
}

async function myCartItems(params) {
  let pipeline = [];
  pipeline.push({
    $match: {
      'userId': mongoose.Types.ObjectId(params.user.userId)
    }
  })

  pipeline.push({
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "bookData"
    }
  })


  pipeline.push({
    $unwind: {
      path: '$bookData'
    }
  })



  pipeline.push({
    $group: {
      _id: "$_id",
      bookName: {
        $first: "$bookData.bookName",
      },
      authorName: {
        $first: "$bookData.authorName",
      },
      costPrice: {
        $first: "$bookData.costPrice",
      },
      isbnNum: {
        $first: "$bookData.isbnNum",
      },
      bookImage: {
        $first: "$bookData.bookImage",
      },
      quantity: {
        $first: "$quantity",
      }
    }
  })

  if (!params.project) {
    params.project = {
      deviceToken: 0,
      deviceID: 0,
    }
  }

  if (params.page && params.limit) {
    params.skipData = [{
      $skip: parseInt(((params.page - 1) * params.limit))
    },
    {
      $limit: parseInt(params.limit)
    }
    ]
  } else {
    params.skipData = [{
      $project: params.project
    }];
  }

  pipeline.push({
    $facet: {
      totalCount: [
        { $group: { _id: null, count: { $sum: 1 } } },
      ],
      data: params.skipData
    }
  })

  pipeline.push({ $unwind: "$totalCount" }, {
    $project: {
      totalCount: "$totalCount.count",
      data: "$data",

    }
  })


  return cartDao.aggregate(pipeline).then(res => {
    if (res.length) {
      return res[0]
    } else {
      return { totalCount: 0, data: [] }
    }
  })
}

//========================== Export Module Start ==============================

module.exports = {
  addToCart,
  isBookExistWithThisUser,
  updateQuantityOfBook,
  removeFromCart,
  isProductExist,
  myCartItems
};

//========================== Export Module End ===============================
