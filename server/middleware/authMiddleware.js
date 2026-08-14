const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  try {
    // =================================================
    // CHECK AUTHORIZATION HEADER
    // =================================================

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    // =================================================
    // EXTRACT TOKEN
    // =================================================

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing.",
      });
    }

    // =================================================
    // CHECK JWT SECRET
    // =================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables."
      );

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    // =================================================
    // VERIFY TOKEN
    // =================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // =================================================
    // SAVE ADMIN DATA
    // =================================================

    req.admin = decoded;

    // =================================================
    // CONTINUE
    // =================================================

    next();

  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protectAdmin;