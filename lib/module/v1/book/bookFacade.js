"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require('ip');
var vCardsJS = require('vcards-js');
//========================== Load internal modules ====================

const bookService = require('./bookService');
const bookMapper = require('./bookMapper');

const appUtils = require('../../../appUtils');
const redisSession = require("../../../redisClient/session");
const customException = require("../../../customException");
const emailService = require("../../../service/sendgrid_email");
const constant = require("../../../constant");
const config = require("../../../config");

//========================== Load Modules End ==============================================

function allAvailableBooks(params) {
    return bookService.allAvailableBooks(params)
}

function addBook(params) {
    return bookService.checkISBNStatus(params)
        .then(result => {
            if (result) {
                return customException.bookAlreadyExists()
            } else {
                return bookService.addBook(params)
            }
        })
        .then(params => {
            return bookMapper.addBook(params)
        })
}

function deleteBookFromStore(params) {
    return bookService.isBookExist(params)
        .then(bookExist => {
            if (bookExist) {
                return bookService.deleteBookFromStore(params)
            } else {
                throw customException.bookNotFound()
            }
        })
        .then(result => {
            return bookMapper.deleteBookFromStore(result)
        })
}

function allAuthors(params) {
    return bookService.allAuthors(params)
}

function authorWiseBook(params) {
    return bookService.authorWiseBook(params)
}

function bulkAddBooksToStore(params) {
    for (let x = 0; x < params.uploadFile.length; x++) {
        params.bookName = params.uploadFile[x].bookName
        params.authorName = params.uploadFile[x].authorName
        params.costPrice = params.uploadFile[x].costPrice
        params.isbnNum = params.uploadFile[x].isbnNum
        params.isDeleted = params.uploadFile[x].isDeleted
        params.description = params.uploadFile[x].description
        return bookService.checkISBNStatus(params)
            .then(result => {
                if (result) {
                    return customException.bookAlreadyExists()
                } else {
                    return bookService.bulkAddBooksToStore(params)
                }
            })
            .then(params => {
                return bookMapper.addBook(params)
            })
    }
}

//========================== Export Module Start ==============================

module.exports = {
    allAvailableBooks,
    addBook,
    deleteBookFromStore,
    allAuthors,
    authorWiseBook,
    bulkAddBooksToStore
};

//========================== Export Module End ================================