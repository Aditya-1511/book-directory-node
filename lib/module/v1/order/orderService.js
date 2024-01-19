"use strict";

const { ObjectId } = require("mongodb");
//========================== Load Modules Start =======================
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const orderDao = require("../order/orderDao");

//========================== Load Modules End ==============================================

function placeOrder(params) {
  return orderDao.placeOrder(params);
}

function getParticularUserOrders(params) {
  return orderDao.getParticularUserOrders(params);
}

//========================== Export Module Start ==============================

module.exports = {
  placeOrder,
  getParticularUserOrders
};

//========================== Export Module End ===============================
