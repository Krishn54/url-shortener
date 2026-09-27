const router = require("express").Router();

const {
    getUrlAnalytics
} = require("../controllers/analyticsController");

const authenticate = require("../middleware/auth");

router.get("/:id", authenticate, getUrlAnalytics);

module.exports = router;