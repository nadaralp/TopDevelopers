const express = require("express");
const router = express.Router();

// @route   GET api/userss
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("users route"));

module.exports = router;
