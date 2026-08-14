const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const testAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@qizarsolutions.com";
    const password = "Admin@12345";

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("❌ ADMIN NOT FOUND");
      process.exit(1);
    }

    console.log("✅ ADMIN FOUND");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    console.log(
      "Stored password starts with:",
      admin.password.substring(0, 10)
    );

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    console.log(
      "Password match:",
      passwordMatch
    );

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {
    console.error("❌ ERROR:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

testAdmin();