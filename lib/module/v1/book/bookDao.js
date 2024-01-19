"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
const appUtils = require("../../../appUtils");
//========================== Load internal modules ====================
const bookModel = require('./bookModel');


// init book dao
let BaseDao = require('../../../dao/baseDao');
const bookDao = new BaseDao(bookModel);


//========================== Load Modules End ==============================================

function allAvailableBooks(params) {
    let pipeline = []
    pipeline.push({
        $match: {
            "isDeleted": 0
        }
    })

    if (!params.project) {
        params.project = {
            deviceToken: 0,
            deviceID: 0,
        }
    }

    if (params.page && params.limit) {
        params.skipData = [{
            $skip: parseInt(((params.page - 1) * params.limit))
        },
        {
            $limit: parseInt(params.limit)
        }
        ]
    } else {
        params.skipData = [{
            $project: params.project
        }];
    }

    pipeline.push({
        $facet: {
            totalCount: [
                { $group: { _id: null, count: { $sum: 1 } } },
            ],
            data: params.skipData
        }
    })

    pipeline.push({ $unwind: "$totalCount" }, {
        $project: {
            totalCount: "$totalCount.count",
            data: "$data",

        }
    })
    return bookDao.aggregate(pipeline).then(res => {
        if (res.length) {
            return res[0]
        } else {
            return { totalCount: 0, data: [] }
        }
    })
}

function addBook(params) {
    var book = new bookModel(params);
    return bookDao.save(book);
}

function checkISBNStatus(params) {
    let query = {}
    query.isbnNum = params.isbnNum
    return bookDao.findOne(query)
}

function isBookExist(params) {
    let query = {}
    query.bookId = params.bookId
    return bookDao.findOne(query)
}

function deleteBookFromStore(params) {
    let query = {}
    query._id = params.bookId
    let update = {}
    update = {
        $set: {
            isDeleted: 1
        }
    }
    let options = {}
    options.new = true
    return bookDao.findByIdAndUpdate(query, update, options)
}

function allAuthors(params) {
    let pipeline = []
    pipeline.push({
        $match: {
            "isDeleted": 0
        }
    })

    pipeline.push({
        $group: {
            _id: { "authorName": "$authorName" },
            bookName: { "$first": "$bookName" }
        }
    })

    if (!params.project) {
        params.project = {
            deviceToken: 0,
            deviceID: 0,
        }
    }

    if (params.page && params.limit) {
        params.skipData = [{
            $skip: parseInt(((params.page - 1) * params.limit))
        },
        {
            $limit: parseInt(params.limit)
        }
        ]
    } else {
        params.skipData = [{
            $project: params.project
        }];
    }

    pipeline.push({
        $facet: {
            totalCount: [
                { $group: { _id: null, count: { $sum: 1 } } },
            ],
            data: params.skipData
        }
    })

    pipeline.push({ $unwind: "$totalCount" }, {
        $project: {
            totalCount: "$totalCount.count",
            data: "$data",

        }
    })

    return bookDao.aggregate(pipeline).then(res => {
        if (res.length) {
            return res[0]
        } else {
            return { totalCount: 0, data: [] }
        }
    })
}

function authorWiseBook(params) {
    let pipeline = []
    pipeline.push({
        $match: {
            "authorName": { $regex: new RegExp(["^", params.authorName].join("")), '$options': 'i' }
        }
    })

    pipeline.push({
        $group: {
            _id: { "bookName": "$bookName" },
            authorName: { "$first": "$authorName" }
        }
    })

    if (!params.project) {
        params.project = {
            deviceToken: 0,
            deviceID: 0,
        }
    }

    if (params.page && params.limit) {
        params.skipData = [{
            $skip: parseInt(((params.page - 1) * params.limit))
        },
        {
            $limit: parseInt(params.limit)
        }
        ]
    } else {
        params.skipData = [{
            $project: params.project
        }];
    }

    pipeline.push({
        $facet: {
            totalCount: [
                { $group: { _id: null, count: { $sum: 1 } } },
            ],
            data: params.skipData
        }
    })

    pipeline.push({ $unwind: "$totalCount" }, {
        $project: {
            totalCount: "$totalCount.count",
            data: "$data",

        }
    })

    return bookDao.aggregate(pipeline).then(res => {
        if (res.length) {
            return res[0]
        } else {
            return { totalCount: 0, data: [] }
        }
    })
}

function bulkAddBooksToStore(params) {
    var book = new bookModel(params);
    return bookDao.insertMany(book);
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
