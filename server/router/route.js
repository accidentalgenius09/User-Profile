const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  getUser,
  updateUser,
  createResetSession,
  resetpassword,
  verifyUser,
} = require("../controllers/appController");
const {Auth} = require('../middleware/auth')

//GET methods

router.route("/user/:username").get(getUser);
// router.route("/generateOTP").get(generateOTP)
// router.route("/verifyOTP").get(verifyOTP)
router.route("/createResetSession").get(createResetSession);

//POST methods
router.route("/register").post(register);
router.route("/registerMail").post();
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(verifyUser, login);

// PUT method
router.route("/updateuser").put(Auth, updateUser);
// router.route('/resetpassword').put(resetPassword)

module.exports = {
  router,
};
