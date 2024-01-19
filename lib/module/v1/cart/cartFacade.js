"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require("ip");
var vCardsJS = require("vcards-js");
//========================== Load internal modules ====================

const cartMapper = require("./cartMapper");
const customException = require("../../../customException");
const constant = require("../../../constant");
const config = require("../../../config");
const { response } = require("express");
const { Service, CustomerProfiles } = require("aws-sdk");
const { generate } = require("randomstring");
const cartService = require("../cart/cartService");
const userService = require("../user/userService");
const bookService = require("../book/bookService");
const { result } = require("lodash");

//========================== Load Modules End ==============================================

function addToCart(params) {
  return userService
    .isUserExist({ email: params.user.email })
    .then((userExist) => {
      if (userExist) {
        return bookService.isBookExist(params).then((bookExist) => {
          if (bookExist) {
            return cartService
              .isBookExistWithThisUser(params)
              .then((isBookExistWithThisUser) => {
                if (isBookExistWithThisUser.length > 0) {
                  return cartService.updateQuantityOfBook(params);
                } else {
                  return cartService.addToCart(params).then((result) => {
                    return cartMapper.addToCart(result);
                  });
                }
              });
          } else {
            throw customException.bookNotFound();
          }
        });
      } else {
        throw customException.userNotFound();
      }
    });
}

function removeFromCart(params) {
  return cartService.isProductExist(params)
    .then(isProductExist => {
      if (isProductExist) {
        return cartService.removeFromCart(params)
      } else {
        throw customException.bookNotFound()
      }
    })
    .then(result => {
      return cartMapper.removeFromCart(result)
    })
}

function myCartItems(params) {
  return cartService.myCartItems(params)
    .then(result => {
      if (result) {
        return cartMapper.myCartItems(result)
      } else {
        throw customException.noProductsExistWithThisUser()
      }
    })
}

//========================== Export Module Start ==============================

module.exports = {
  addToCart,
  removeFromCart,
  myCartItems
};

//========================== Export Module End ================================
