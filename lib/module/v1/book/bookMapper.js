/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require('../../../config');


function list(params) {
    var respObj = {
        "message": "Book list fetched successfully",
        "result": params.result,
    }
    return respObj;
}

function addBook(params) {
    var respObj = {
        "message": "Book added successfully",
        "result": params,
    }
    return respObj;
}

function deleteBookFromStore(params) {
    var respObj = {
        "message": "Book deleted from store successfully",
        "result": params,
    }
    return respObj;
}


module.exports = {
    list,
    addBook,
    deleteBookFromStore
}