"use strict";

//========================== Load Modules Start =======================
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const bookDao = require('./bookDao');

//========================== Load Modules End ==============================================

function allAvailableBooks(params) {
    return bookDao.allAvailableBooks(params)
}

function addBook(params) {
    return bookDao.addBook(params)
}

function checkISBNStatus(params) {
    return bookDao.checkISBNStatus(params)
}

function isBookExist(params) {
    return bookDao.isBookExist(params)
}

function deleteBookFromStore(params) {
    return bookDao.deleteBookFromStore(params)
}

function allAuthors(params) {
    return bookDao.allAuthors(params)
}

function authorWiseBook(params) {
    return bookDao.authorWiseBook(params)
}

function bulkAddBooksToStore(params) {
    return bookDao.bulkAddBooksToStore(params)
}

//========================== Export Module Start ==============================

module.exports = {
    allAvailableBooks,
    addBook,
    checkISBNStatus,
    isBookExist,
    deleteBookFromStore,
    allAuthors,
    authorWiseBook,
    bulkAddBooksToStore
};

//========================== Export Module End ===============================
