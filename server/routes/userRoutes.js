const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// GET ALL USERS - ADMIN ONLY
// ==========================================

router.get("/", protectAdmin, getUsers);


// ==========================================
// GET SINGLE USER - ADMIN ONLY
// ==========================================

router.get("/:id", protectAdmin, getUser);


// ==========================================
// DELETE USER - ADMIN ONLY
// ==========================================

router.delete("/:id", protectAdmin, deleteUser);


module.exports = router;