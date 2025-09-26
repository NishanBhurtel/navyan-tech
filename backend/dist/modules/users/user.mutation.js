"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutationHandler = exports.removeUser = exports.updateUserDetails = void 0;
const users_repository_1 = __importDefault(require("../../repository/mongodb/user/users.repository"));
const updateUserDetails = async ({ req, res }) => {
    try {
        const userID = req.params.userID;
        const { userName: { firstName, lastName, }, email, phoneNumber, } = req.body;
        const newUser = await users_repository_1.default.updateUser(userID, {
            userName: {
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            phoneNumber: phoneNumber,
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "User updated successfully",
                data: newUser,
            },
        };
    }
    catch (error) {
        console.error("Error updating user:", error);
        return {
            status: 500,
            body: {
                success: false,
                message: "Failed to update user",
                error: error.message,
            },
        };
    }
};
exports.updateUserDetails = updateUserDetails;
const removeUser = async ({ req }) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return {
                status: 400,
                body: { success: false, error: "User ID is required" },
            };
        }
        const deletedUser = await users_repository_1.default.deleteUser(userID);
        if (!deletedUser) {
            return {
                status: 404,
                body: { success: false, error: "User not found" },
            };
        }
        return {
            status: 200,
            body: { success: true, message: "User deleted successfully" },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: { success: false, error: error.message },
        };
    }
};
exports.removeUser = removeUser;
exports.userMutationHandler = {
    updateUserDetails: exports.updateUserDetails,
    removeUser: exports.removeUser,
};
