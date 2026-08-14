const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@qizarsolutions.com";
    const password = "Admin@12345";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists.");
      console.log("Email:", email);

      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      name: "Qizar Admin",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("=================================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("=================================");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("Role:", admin.role);
    console.log("=================================");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

createAdmin();