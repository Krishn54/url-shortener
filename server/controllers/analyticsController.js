const Url = require("../models/Url");
const Click = require("../models/Click");

const getUrlAnalytics = async (req, res) => {
    try {
        const { id } = req.params;

        const url = await Url.findOne({
            _id: id,
            user: req.user.userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        const clicks = await Click.find({
            url: url._id
        });

        // Today's clicks
        const today = new Date();

        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const todayClicks = clicks.filter(
            click => click.timestamp >= startOfDay
        ).length;

        // Devices
        const devices = {};

        clicks.forEach(click => {
            const device = click.device || "Unknown";

            devices[device] = (devices[device] || 0) + 1;
        });

        // Browsers
        const browsers = {};

        clicks.forEach(click => {
            const browser = click.browser || "Unknown";

            browsers[browser] = (browsers[browser] || 0) + 1;
        });

        // Operating systems
        const operatingSystems = {};

        clicks.forEach(click => {
            const os = click.os || "Unknown";

            operatingSystems[os] =
                (operatingSystems[os] || 0) + 1;
        });

        // Clicks per day
        const clicksPerDay = {};

        clicks.forEach(click => {
            const date = click.timestamp
                .toISOString()
                .split("T")[0];

            clicksPerDay[date] =
                (clicksPerDay[date] || 0) + 1;
        });

        res.status(200).json({
            url: {
                id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode
            },

            totalClicks: url.clicks,

            todayClicks,

            devices,

            browsers,

            operatingSystems,

            clicksPerDay
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUrlAnalytics
};