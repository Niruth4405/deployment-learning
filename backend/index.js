const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Imports:
const notesRoutes = require("./routes/notesRoutes");
const ConnectionString = require("./config/db");

// Connect to database:
ConnectionString();

// Middleware:
app.use(cors({
  origin: "http://localhost:5173", // Allow your frontend origin here
  methods: "GET,POST,PUT,DELETE",  // Allowed HTTP methods
  credentials: true,               // Enable cookies and auth headers if used
}));

app.use(express.json());

// Routes:
app.use("/api/notes", notesRoutes);

app.get("/", async (req, res) => {
  return res.json({ message: "Server working fine shawty" });
});

app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
