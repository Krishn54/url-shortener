const AppError = require("../middleware/AppError");
const Url = require("../models/Url");
const Click = require("../models/Click");

const { nanoid } = require("nanoid");
const UAParser = require("ua-parser-js");
// Create Short URL
const createShortUrl = async (req, res,next) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return next(new AppError("URL is required", 400));
        }

        try {
    const parsedUrl = new URL(originalUrl);

    if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
    ) {
        return next(
            new AppError(
                "Only HTTP and HTTPS URLs are allowed",
                400
            )
        );
    }

} catch {
    return next(new AppError("Invalid URL", 400));
}

        const shortCode = nanoid(6);

        const newUrl = await Url.create({
            originalUrl,
            shortCode,
            user: req.user.userId
        });

        res.status(201).json(newUrl);

    } catch (error) {
       next(error);
    }
};

// Redirect to Original URL
const redirectUrl = async (req, res,next) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return next(new AppError("Short URL not found", 404));
        }

        // Parse user-agent
        const parser = new UAParser(req.headers["user-agent"]);

        const device = parser.getDevice();
        const browser = parser.getBrowser();
        const os = parser.getOS();

        // Increase total clicks
        url.clicks += 1;
        await url.save();

        // Save click analytics
        await Click.create({
            url: url._id,

            device: device.type || "Desktop",

            browser: browser.name || "Unknown",

            os: os.name || "Unknown",

            referrer: req.headers.referer || "Direct"
        });

        res.redirect(url.originalUrl);

    } catch (error) {
        next(error);
    }
};

const getAllUrls = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search;
        const sort = req.query.sort;

        const skip = (page - 1) * limit;

        // Filter
        const filter = {
            user: req.user.userId
        };

        // Search by original URL
        if (search) {
            filter.originalUrl = {
                $regex: search,
                $options: "i"
            };
        }

        // Sorting
        let sortOption = {
            createdAt: -1
        };

        if (sort === "clicks") {
            sortOption = {
                clicks: -1
            };
        }

        if (sort === "oldest") {
            sortOption = {
                createdAt: 1
            };
        }

        // Get URLs
        const urls = await Url.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sortOption);

        // Count filtered URLs
        const totalUrls = await Url.countDocuments(filter);

        res.status(200).json({
            urls,
            currentPage: page,
            totalPages: Math.ceil(totalUrls / limit),
            totalUrls
        });

    } catch (error) {
        next(error);
    }
};
const deleteUrl = async (req, res,next) => {
    try {
        const { id } = req.params;

        const url = await Url.findOne({
    _id: id,
    user: req.user.userId
});

if (!url) {
    return next(new AppError("URL not found", 404));
}

await Click.deleteMany({
    url: url._id
});

await Url.deleteOne({
    _id: url._id
});

        if (!url) {
            return next(new AppError("URL not found", 404));
        }

        res.status(200).json({
            message: "URL deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
  createShortUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl,
};