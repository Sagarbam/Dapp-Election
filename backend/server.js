// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) if needed
// (Adjust 'src' folder to your actual front-end folder name)
app.use(express.static(path.join(__dirname, 'src')));

// Use your auth router for /api/auth
app.use("/api/auth", require("./router/auth-router"));

// Start Server
const PORT = 5000; // or any port you prefer
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
