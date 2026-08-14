const express = require("express");

const {
  loginAdmin,
  getCurrentAdmin,
} = require("../controllers/authController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// ADMIN LOGIN
// =====================================================

router.post(
  "/login",
  loginAdmin
);


// =====================================================
// CURRENT ADMIN
// =====================================================

router.get(
  "/me",
  protectAdmin,
  getCurrentAdmin
);


module.exports = router;