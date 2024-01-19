/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require("../../../config");

function addToCart(params) {
  var respObj = {
    message: "Book has been added to cart successfully",
    result: params,
  };
  return respObj;
}

function updateQuantityOfBook(params) {
  var respObj = {
    message: "The quantity has been updated in cart",
    result: params,
  };
  return respObj;
}

function removeFromCart(params) {
  var respObj = {
    message: "Item removed from cart successfully",
    result: params,
  };
  return respObj;
}

function myCartItems(params) {
  var respObj = {
    message: "Cart items fetched successfully",
    result: params,
  };
  return respObj;
}

module.exports = {
  addToCart,
  updateQuantityOfBook,
  removeFromCart,
  myCartItems
};
