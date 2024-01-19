"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require("ip");
var vCardsJS = require("vcards-js");
//========================== Load internal modules ====================

const orderMapper = require("./orderMapper");
const customException = require("../../../customException");
const constant = require("../../../constant");
const config = require("../../../config");
const { response } = require("express");
const { Service, CustomerProfiles } = require("aws-sdk");
const { generate } = require("randomstring");
const orderService = require("../order/orderService");
const cartService = require("../cart/cartService");
const { result } = require("lodash");
const emailService = require("../../../service/sendgrid_email");
const userService = require('../user/userService')

//========================== Load Modules End ==============================================

function placeOrder(params) {
    return cartService.isBookExistWithThisUser(params)
        .then(async isBookExistWithThisUser => {
            if (isBookExistWithThisUser) {
                let orderPlaced = await orderService.placeOrder(params)
                    .then(orderPlaced => {
                        if (orderPlaced) {
                            let emailInfo = {};
                            emailInfo.OTP = params.OTP;
                            emailInfo.email = params.user.email;
                            emailInfo.subject = "Order Details";
                            emailInfo.template = "orderPlaced.ejs";
                            emailInfo.orderId = orderPlaced._id
                            emailService.sendEmail(emailInfo);
                            return cartService.removeFromCart(params)
                        }
                    })
                    .then(result => {
                        if (result) {
                            return userService.updateOrderInfo(params)
                        }
                    })
            } else {
                throw customException.noProductsExistWithThisUser()
            }
        })
        .then(result => {
            return orderMapper.placeOrder(result)
        })
}

function getParticularUserOrders(params) {
    return orderService.getParticularUserOrders(params)
        .then(result => {
            return orderMapper.getParticularUserOrders(result)
        })
}

//========================== Export Module Start ==============================

module.exports = {
    placeOrder,
    getParticularUserOrders
};

//========================== Export Module End ================================
