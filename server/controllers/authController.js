const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// =====================================================
// ADMIN LOGIN
// =====================================================

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("=================================");
    console.log("ADMIN LOGIN ATTEMPT");
    console.log("Email:", email);
    console.log("=================================");

    // ---------------------------------------------
    // VALIDATE INPUT
    // ---------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // ---------------------------------------------
    // FIND ADMIN
    // IMPORTANT: Using Admin model
    // ---------------------------------------------

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    console.log("Admin found:", !!admin);

    if (!admin) {
      console.log("❌ ADMIN NOT FOUND");

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    console.log("Admin email:", admin.email);
    console.log("Admin role:", admin.role);

    // ---------------------------------------------
    // CHECK PASSWORD
    // ---------------------------------------------

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("❌ PASSWORD INCORRECT");

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // ---------------------------------------------
    // CREATE JWT
    // ---------------------------------------------

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("✅ ADMIN LOGIN SUCCESSFUL");

    // ---------------------------------------------
    // SEND RESPONSE
    // ---------------------------------------------

    return res.status(200).json({
      message: "Login successful.",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("❌ Admin login error:", error);

    return res.status(500).json({
      message: "Server error during login.",
    });
  }
};


// =====================================================
// GET CURRENT ADMIN
// =====================================================

const getCurrentAdmin = async (req, res) => {
  try {

    const admin = await Admin
      .findById(req.admin.id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      admin,
    });

  } catch (error) {

    console.error("Get admin error:", error);

    return res.status(500).json({
      message: "Unable to fetch admin.",
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  loginAdmin,
  getCurrentAdmin,
};