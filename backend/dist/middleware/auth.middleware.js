"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_repository_1 = __importDefault(require("../repository/mangodb/user/users.repository"));
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET || "your_secret_key"; // replace with env variable
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // attach user info to request
        req.user = { id: decoded.userId };
        // optionally, you can verify user exists in DB
        const user = await users_repository_1.default.getUserByID(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticate = authenticate;
