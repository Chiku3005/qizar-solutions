const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ProductRoutes = require("./routes/ProductRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.get("/debug-test", (req, res) => {
  res.send("THIS IS THE QIZAR SERVER FILE");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/users-test", (req, res) => {
  res.json({
    message: "Users route is reaching this server"
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});