const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", urlRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;