// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var Order;

var OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: constants.DB_MODEL_REF.USER,
        index: true,
    },
    bookId: [{
        type: Schema.Types.ObjectId,
        ref: constants.DB_MODEL_REF.BOOK,
        index: true,
    }],
    quantity: {
        type: Number,
        default: 1,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
    },
});

//Export order module
Order = module.exports = mongoose.model(constants.DB_MODEL_REF.ORDER, OrderSchema);
