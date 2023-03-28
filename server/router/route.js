const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  getUser,
  updateUser,
  createResetSession,
  resetPassword,
  verifyUser,
  generateOTP,
  verifyOTP
} = require("../controllers/appController");
const {Auth,localVariables} = require('../middleware/auth')

//GET methods

router.route("/user/:username").get(getUser);
router.route("/generateOTP").get(verifyUser,localVariables,generateOTP)
router.route("/verifyOTP").get(verifyOTP)
router.route("/createResetSession").get(createResetSession);

//POST methods
router.route("/register").post(register);
router.route("/registerMail").post();
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(verifyUser, login);

// PUT method
router.route("/updateuser").put(Auth, updateUser);
router.route('/resetPassword').put(verifyUser, resetPassword)

module.exports = {
  router,
};
