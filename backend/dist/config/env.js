"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
    MONGO_URI: process.env.MONGO_URI || "",
    DB_NAME: process.env.DB_NAME || "dev",
};
exports.default = env;
