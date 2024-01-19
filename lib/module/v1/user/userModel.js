// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  workEmail: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  OTP: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  isDelete: {
    type: Number,
    default: 0,
  },
  bookId: [
    {
      type: Schema.Types.ObjectId,
      ref: constants.DB_MODEL_REF.BOOK,
      index: true,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);
