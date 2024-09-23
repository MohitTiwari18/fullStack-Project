const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Handle GET request for leads
const { getLeads } = require("./data/leadData");
app.get("/api/leads", getLeads);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
