const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../middleware/AppError");
const User = require("../models/User");

// REGISTER
exports.registerUser = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        // 1. Validate input
        if (!username || !email || !password) {
    return next(
        new AppError(
            "Username, email and password are required",
            400
        )
    );
}

if (username.length < 3) {
    return next(
        new AppError(
            "Username must be at least 3 characters",
            400
        )
    );
}

if (password.length < 6) {
    return next(
        new AppError(
            "Password must be at least 6 characters",
            400
        )
    );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return next(
        new AppError(
            "Please provide a valid email",
            400
        )
    );
}

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 5. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGIN
exports.loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
    return next(
        new AppError(
            "Email and password are required",
            400
        )
    );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return next(
        new AppError(
            "Please provide a valid email",
            400
        )
    );
}

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // 5. Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path:"/"
        });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGOUT
exports.logoutUser = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
});

    res.json({
        message: "Logout successful"
    });
};