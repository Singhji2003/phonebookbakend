const express = require("express");
const router = express.Router();
// for validation of eamil and names
const { body, validationResult } = require("express-validator");
const User = require("../schemas/UserData");
const fetchUser = require("../middleware/fetchUser");
// for password hashing
var bcrypt = require("bcryptjs");
// for token create
var jwt = require("jsonwebtoken");
let success = false;
// It is for manage own words
const Secret_Word = "SinghJi";
router.post(
  "/new-user",
  [
    // validation of names emails and passwords
    body("password", "Enter valid password").isLength({ min: 5 }),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email Id").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // no duplication of email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, erorr: "Enter a unique email id" });
    }
    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const protectPswd = bcrypt.hashSync(req.body.password, salt);
    try {
      //  Entering the data in mongoose
      user = await User.create({
        name: req.body.name,
        password: protectPswd,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      // for token create
      const token = jwt.sign(data, Secret_Word);
      success = true
      res.json({success, token });
    } catch {
      {
        error: "Some internal Error occured";
      }
    }
  }
);

////  For login users
router.post(
  "/login",
  [
    // validation of names emails and passwords
    body("password", "Enter valid password").exists(),
    body("email", "Enter valid email Id").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // getting email and password from form
    const { email, password } = req.body;
    try {
      // Finding the emails from the mongoose data
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        res.status(400).json({success, error: "Wrong details try again...." });
      }
      // For comapring password corresponding to email
      const pswdCompare = await bcrypt.compare(password, user.password);
      if (!pswdCompare) {
        success = false
        res.status(400).json({success, error: "Wrong details try again...." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      // for token create
      const token = jwt.sign(data, Secret_Word);
      success= true;
      res.json({ success, token });
    } catch {
      {
        error: "Some internal Error occured";
      }
    }
  }
);

// For fetching User details

router.post("/user-details", fetchUser, async (req, res) => {
  try {
    // for fetching the user id
    const data = req.user.id;
    // Getting data using the id
    const userData = await User.findById(data).select("-password");
    success= true;
    res.json(success, userData);
  } catch {
    {
      error: "Some internal Error occured";
    }
  }
});

module.exports = router;
