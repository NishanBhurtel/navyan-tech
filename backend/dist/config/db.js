"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
// src/config/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectToDatabase() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("❌ MONGO_URI is not defined in your .env file.");
    }
    try {
        await mongoose_1.default.connect(mongoUri, {
            dbName: process.env.DB_NAME || "doClocks",
        });
        console.log("✅ Connected to MongoDB via Mongoose");
    }
    catch (error) {
        console.error("❌ Mongoose connection error:", error);
        process.exit(1);
    }
}
