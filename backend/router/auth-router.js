// router/auth-router.js
const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  checkNumber,
  getRegisteredUsers,
  registerUser
} = require("../controllers/auth_controllers");

// POST /api/auth/checkNumber
router.post("/checkNumber", checkNumber);

// GET /api/auth/getRegisteredUsers
router.get("/getRegisteredUsers", getRegisteredUsers);

// POST /api/auth/registerUser (New route for registering a new user)
router.post("/registerUser", registerUser);

module.exports = router;
