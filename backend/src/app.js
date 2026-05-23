const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes); 
module.exports = app;
