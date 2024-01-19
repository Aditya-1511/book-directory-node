/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require("../../../config");

function placeOrder(params) {
    var respObj = {
        message: "Order has been placed successfully",
        result: params,
    };
    return respObj;
}

function getParticularUserOrders(params) {
    var respObj = {
        message: "Order list fetched successfully",
        result: params,
    };
    return respObj;
}

module.exports = {
    placeOrder,
    getParticularUserOrders
};
