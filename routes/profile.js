const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { income, savingsTarget, expenseLimit } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profile: { income, savingsTarget, expenseLimit } },
    { new: true }
  );

  res.json(user.profile);
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.profile);
});

module.exports = router;
