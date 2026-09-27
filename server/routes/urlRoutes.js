const express = require("express");

const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl,
} = require("../controllers/urlController");

const authenticate = require("../middleware/auth");
const { shortenLimiter } = require("../middleware/rateLimiter");
router.post("/shorten", authenticate, shortenLimiter, createShortUrl);

router.get("/urls", authenticate, getAllUrls);

router.delete("/urls/:id", authenticate, deleteUrl);

router.get("/:shortCode", redirectUrl);

module.exports = router;
