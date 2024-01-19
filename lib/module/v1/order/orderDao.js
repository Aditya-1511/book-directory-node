"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const orderModel = require("./orderModel");

// init order dao
let BaseDao = require("../../../dao/baseDao");
const orderDao = new BaseDao(orderModel);

//========================== Load Modules End ==============================================

function placeOrder(params) {
    params.userId = mongoose.Types.ObjectId(params.user.userId).toString();
    var order = new orderModel(params);
    return orderDao.save(params);
}

function getParticularUserOrders(params) {
    let query = {}
    query.userId = mongoose.Types.ObjectId(params.user.userId).toString();
    return orderDao.find(query);
}


//========================== Export Module Start ==============================

module.exports = {
    placeOrder,
    getParticularUserOrders
};

//========================== Export Module End ===============================
