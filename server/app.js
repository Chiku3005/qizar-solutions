const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const express = require("express");
const orderRoutes = require("./routes/OrderRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Qizar Solutions Backend is Running...");
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Qizar Solutions API"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});