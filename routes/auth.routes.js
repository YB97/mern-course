const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

//post /api/auth/regsiter
router.post(
  "/register",
  [
    check("email", "Wrong email").isEmail(),
    check("password", "Min length is 6").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log("body", req.body);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Invalid data" });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "This username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(200).json({ message: "User created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
);

//post /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Enter Passwors").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Invalid data" });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "This user does not exists" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Wrong password. Please try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
);

module.exports = router;
