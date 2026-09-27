const requiredEnv = [
    "MONGO_URI",
    "JWT_SECRET",
    "CLIENT_URL"
];

for (const variable of requiredEnv) {
    if (!process.env[variable]) {
        console.error(`Missing environment variable: ${variable}`);
        process.exit(1);
    }
}