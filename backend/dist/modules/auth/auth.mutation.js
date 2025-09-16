"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMutationHandler = exports.loginUser = exports.registerUser = void 0;
const users_repository_1 = __importDefault(require("../../repository/mangodb/user/users.repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = async ({ req }) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const existingUsers = await users_repository_1.default.getAllUsers({
            email: email.toLowerCase(),
        });
        if (existingUsers.length > 0) {
            return {
                status: 400,
                body: { success: false, error: "Email already in use" },
            };
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const newUser = await users_repository_1.default.save({
            userName: { firstName, lastName },
            email: email.toLowerCase(),
            password: passwordHash,
            phoneNumber,
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "User registered successfully",
                userId: newUser._id.toString(),
            },
        };
    }
    catch (error) {
        console.error("Register error:", error);
        return {
            status: 500,
            body: { success: false, error: "Internal server error" },
        };
    }
};
exports.registerUser = registerUser;
const loginUser = async ({ req, res }) => {
    try {
        const { email, password } = req.body;
        const users = await users_repository_1.default.getAllUsers({ email: email.toLowerCase() });
        if (users.length === 0) {
            return { status: 404, body: { success: false, error: "User not found" } };
        }
        const user = users[0];
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                status: 401,
                body: { success: false, error: "Invalid credentials" },
            };
        }
        const userId = user._id.toString();
        return {
            status: 200,
            body: {
                success: true,
                message: "User logged in successfully",
                _id: userId,
                email: user.email,
                firstName: user.userName.firstName,
                lastName: user.userName.lastName,
            },
        };
    }
    catch (error) {
        console.error("Login error:", error);
        return {
            status: 500,
            body: { success: false, error: "Internal server error" },
        };
    }
};
exports.loginUser = loginUser;
exports.authMutationHandler = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser,
};
