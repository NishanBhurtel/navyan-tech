"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalNumberOfUsers = void 0;
const users_repository_1 = __importDefault(require("../../repository/mangodb/user/users.repository"));
const getTotalNumberOfUsers = async () => {
    try {
        const users = await users_repository_1.default.countUsers();
        return {
            status: 200,
            body: { success: true, totalUsers: users },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: { success: false, error: "Internal server error" },
        };
    }
};
exports.getTotalNumberOfUsers = getTotalNumberOfUsers;
const authQueryHandler = {
    getTotalNumberOfUsers: exports.getTotalNumberOfUsers,
};
exports.default = authQueryHandler;
