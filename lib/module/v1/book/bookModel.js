// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var Book;

var BookSchema = new Schema({
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  costPrice: {
    type: String,
  },
  isbnNum: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
  bookImage: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

//Export user module
Book = module.exports = mongoose.model(constants.DB_MODEL_REF.BOOK, BookSchema);
