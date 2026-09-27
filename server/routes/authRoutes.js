const router = require("express").Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");
const {
    loginLimiter
} = require("../middleware/rateLimiter");
const authenticate = require("../middleware/auth");

router.post("/register", registerUser);

router.post(
    "/login",
    loginLimiter,
    loginUser
);

router.post("/logout", logoutUser);

// Get currently logged-in user
router.get("/me", authenticate, (req, res) => {
    res.status(200).json({
        user: req.user
    });
});

module.exports = router;