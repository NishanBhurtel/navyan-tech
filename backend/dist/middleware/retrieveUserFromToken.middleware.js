"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserFromTokenMiddleware = void 0;
const env_1 = __importDefault(require("../config/env"));
const auth_repository_1 = require("../repository/mongodb/auth/auth.repository");
const users_repository_1 = __importDefault(require("../repository/mongodb/user/users.repository"));
const retrieveUserFromTokenMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);
        // No token → skip
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next();
        }
        const token = authHeader.split(" ")[1];
        const decoded = auth_repository_1.authRepository.verifyJwtToken(token, env_1.default.JWT_SECRET);
        if (decoded?.userId) {
            const user = await users_repository_1.default.getUserByID(decoded.userId);
            if (user) {
                req.user = {
                    id: decoded.userId,
                    role: user.role,
                };
            }
        }
        next();
    }
    catch (err) {
        console.error("Error in retrieveUserFromTokenMiddleware:", err);
        // Invalid token → just skip user, don't block
        next();
    }
};
exports.retrieveUserFromTokenMiddleware = retrieveUserFromTokenMiddleware;
