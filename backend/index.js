const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// Imports:
const notesRoutes = require("./routes/notesRoutes");
const ConnectionString = require("./config/db");

// Connect to database:
ConnectionString();

if (process.env.NODE_ENV !== "production") {
  // Middleware:
  app.use(
    cors({
      origin: "http://localhost:5173", // Allow your frontend origin here
      methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
      credentials: true, // Enable cookies and auth headers if used
    })
  );
}

app.use(express.json());

// Routes:
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

 app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

}

app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
