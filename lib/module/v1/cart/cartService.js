"use strict";

const { ObjectId } = require("mongodb");
//========================== Load Modules Start =======================
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const cartDao = require("../cart/cartDao");

//========================== Load Modules End ==============================================

function addToCart(params) {
  return cartDao.addToCart(params);
}

function isBookExistWithThisUser(params) {
  return cartDao.isBookExistWithThisUser(params);
}

function updateQuantityOfBook(params) {
  return cartDao.updateQuantityOfBook(params);
}

function removeFromCart(params) {
  return cartDao.removeFromCart(params);
}

function isProductExist(params) {
  return cartDao.isProductExist(params);
}

function myCartItems(params) {
  return cartDao.myCartItems(params);
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
