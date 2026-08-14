const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@qizarsolutions.com";
    const newPassword = "Admin@12345";

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found.");
      await mongoose.connection.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    console.log("=================================");
    console.log("ADMIN PASSWORD RESET SUCCESSFULLY");
    console.log("=================================");
    console.log("Email:", email);
    console.log("Password:", newPassword);
    console.log("=================================");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Error resetting admin:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

resetAdmin();