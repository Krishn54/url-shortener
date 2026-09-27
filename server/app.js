const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/analytics", analyticsRoutes);
app.use("/auth", authRoutes);
app.use("/api", urlRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Central Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const message =
        statusCode === 500
            ? "Internal Server Error"
            : err.message;

    res.status(statusCode).json({
        success: false,
        message
    });
});

module.exports = app;