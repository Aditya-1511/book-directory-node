const router = require("express").Router();
const requestIp = require("request-ip");

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const bookFacade = require("./bookFacade");
const bookValidator = require("./bookValidator");

const constant = require("../../../constant");
//==============================================================

router
  .route("/list/allAvailableBooks")
  .get([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    bookFacade
      .allAvailableBooks({
        user
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/addBookToStore")
  .post(
    [
      middleware.authenticate.autntctTkn,
      middleware.multer.single("bookImage"),
      middleware.mediaUpload.uploadSingleMediaToS3("uploads"),
    ],
    function (req, res) {
      let { user } = req;
      let {
        bookName,
        authorName,
        isbnNum,
        costPrice,
        category,
        status,
        isDelete,
        description,
      } = req.body;
      let bookImage = req.body.location;
      bookFacade
        .addBook({
          user,
          bookName,
          authorName,
          isbnNum,
          costPrice,
          category,
          status,
          isDelete,
          description,
          bookImage,
        })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

router
  .route("/deleteBookFromStore")
  .delete(
    [
      middleware.authenticate.autntctTkn,
    ],
    function (req, res) {
      let { bookId } = req.body;
      bookFacade
        .deleteBookFromStore({
          bookId
        })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

router
  .route("/list/allAuthors")
  .get([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { page, limit } = req.query;
    bookFacade
      .allAuthors({
        user, page, limit
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/list/authorWiseBook")
  .get([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { authorName } = req.query;
    bookFacade
      .authorWiseBook({
        user, authorName
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/bulkAddBooksToStore")
  .post(
    [middleware.authenticate.autntctTkn, middleware.multer.single("uploadFile"), middleware.mediaUpload.parseExcelFile()],
    function (req, res) {
      let { user } = req;
      let { uploadFile } = req.body;
      bookFacade
        .bulkAddBooksToStore({
          user,
          uploadFile
        })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

module.exports = router;
