const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

module.exports = app;
