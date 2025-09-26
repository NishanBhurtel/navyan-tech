"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersQueryHandler = void 0;
const users_repository_1 = __importDefault(require("../../repository/mongodb/user/users.repository"));
// GET /users/details/:userID
const getUserDetailsByID = async ({ req }) => {
    const { UsersID } = req.params; // matches pathParams in your contract
    if (!UsersID) {
        return {
            status: 400,
            body: { success: false, error: "User ID is required" },
        };
    }
    const user = await users_repository_1.default.getUserByID(UsersID);
    if (!user) {
        return {
            status: 404,
            body: {
                success: false,
                error: "User not found"
            },
        };
    }
    return {
        status: 200,
        body: {
            _id: user._id.toString(),
            firstName: user.userName.firstName,
            lastName: user.userName.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
        },
    };
};
// GET /users
const getAllUsers = async () => {
    try {
        const users = await users_repository_1.default.getAllUsers();
        const formattedUsers = users.map((u) => ({
            _id: u._id.toString(),
            firstName: u.userName.firstName,
            lastName: u.userName.lastName,
            email: u.email,
            phoneNumber: u.phoneNumber,
            createdAt: u.createdAt,
            role: u.role,
        }));
        return {
            status: 200,
            body: formattedUsers, // return array of users directly
        };
    }
    catch (error) {
        console.error("Error in getAllUsers:", error);
        return {
            status: 500,
            body: { success: false,
                error: "Failed to get all users" },
        };
    }
};
exports.usersQueryHandler = {
    getUserDetailsByID,
    getAllUsers,
};
