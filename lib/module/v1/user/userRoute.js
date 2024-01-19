const router = require("express").Router();
const requestIp = require("request-ip");

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const userFacade = require("./userFacade");
const userValidators = require("./userValidators");

const constant = require("../../../constant");
//==============================================================

router
  .route("/signup")
  .post(
    [
      middleware.multer.single("profileImage"),
      middleware.mediaUpload.uploadSingleMediaToS3("uploads"),
      userValidators.validateSignup,
    ],
    function (req, res) {
      let {
        firstName,
        lastName,
        email,
        dob,
        password,
        gender,
        aboutUs,
        phoneNo,
        confirmPassword,
      } = req.body;
      let profileImage = req.body.location;
      userFacade
        .create({
          firstName,
          lastName,
          email,
          dob,
          password,
          gender,
          aboutUs,
          phoneNo,
          confirmPassword,
          profileImage,
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
  .route("/login")
  .post([userValidators.validateLogin], function (req, res) {
    let { email, password } = req.body;
    userFacade
      .userLogin({ email, password })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router.route("/validateOTP").post(function (req, res) {
  let { OTP, email } = req.body;
  userFacade
    .validateOTP({ email, OTP })
    .then(function (result) {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch(function (err) {
      resHndlr.sendError(res, err, req);
    });
});

router
  .route("/forgotPassword")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { email } = req.body;
    userFacade
      .forgotPassword({ user, email })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/resetPassword")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { email, password, confirmPassword } = req.body;
    userFacade
      .resetPassword({ user, email, password, confirmPassword })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/editDetails")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { email, firstName, lastName, dob, phoneNo, gender, aboutUs } =
      req.body;
    userFacade
      .editDetails({
        user,
        email,
        firstName,
        lastName,
        dob,
        phoneNo,
        gender,
        aboutUs,
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/getUserDetails")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { email } = req.body;
    userFacade
      .getUserDetails({ user, email })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/list/allUsers")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    userFacade
      .allUsers({ user })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/list/particularUserBooks")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let {
      page,
      limit,
      search,
      sortField,
      sortType,
      category,
      download,
      userId,
    } = req.body;
    userFacade
      .particularUserBooks({
        user,
        page,
        limit,
        sortField,
        sortType,
        search,
        category,
        download,
        userId,
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/logout")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    console.log("Log out route is working fine");
    let { user } = req;
    let accessToken = req.headers.accesstoken;
    userFacade
      .userLogout({ user, accessToken })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

router
  .route("/deleteAccount")
  .delete([middleware.authenticate.autntctTkn], function (req, res) {
    let { user } = req;
    let { isDelete } = req.body;
    userFacade
      .deleteAccount({ user, isDelete })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

module.exports = router;
