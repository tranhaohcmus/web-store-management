require("dotenv").config();
const express = require("express");
const path = require("path");
const { sequelize } = require("./models");

const rootRouter = require("./routers");

const app = express();

// CORS Configuration
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));
console.log(`📁 Serving static files from: ${path.join(__dirname, "public")}`);

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

// Define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Project Ticket API is running!",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Use the root router for all routes
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
