// controllers/auth_controllers.js
const fs = require("fs");
const path = require("path");

// Existing checkNumber function
exports.checkNumber = (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: "Number is required." });
  }

  const dataPath = path.join(__dirname, "..", "data.json");
  let db = { users: [] };

  try {
    const fileData = fs.readFileSync(dataPath, "utf8");
    db = JSON.parse(fileData);
  } catch (err) {
    console.error("Could not read data.json:", err);
    return res.status(500).json({ error: "Internal server error." });
  }

  const foundUser = db.users.find((u) => u.number === number);
  if (!foundUser) {
    return res.status(404).json({ error: "Wrong number." });
  }

  return res.json({ name: foundUser.name });
};

// New function to get all registered users
exports.getRegisteredUsers = (req, res) => {
  const dataPath = path.join(__dirname, "..", "data.json");
  let db = { users: [] };

  try {
    const fileData = fs.readFileSync(dataPath, "utf8");
    db = JSON.parse(fileData);
  } catch (err) {
    console.error("Could not read data.json:", err);
    return res.status(500).json({ error: "Internal server error." });
  }

  return res.json({ users: db.users });
};

// New function to register a new user
exports.registerUser = (req, res) => {
  const { number, name } = req.body;
  if (!number || !name) {
    return res.status(400).json({ error: "Number and name are required." });
  }

  const dataPath = path.join(__dirname, "..", "data.json");
  let db = { users: [] };

  try {
    const fileData = fs.readFileSync(dataPath, "utf8");
    db = JSON.parse(fileData);
  } catch (err) {
    console.error("Could not read data.json:", err);
    return res.status(500).json({ error: "Internal server error." });
  }

  // Check if user number already exists
  const existingUser = db.users.find((u) => u.number === number);
  if (existingUser) {
    return res.status(409).json({ error: "User with this number already exists." });
  }

  // Add new user
  db.users.push({ number, name });

  // Save back to data.json
  try {
    fs.writeFileSync(dataPath, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("Could not write to data.json:", err);
    return res.status(500).json({ error: "Internal server error writing file." });
  }

  return res.status(200).json({ message: "User registered successfully." });
};
