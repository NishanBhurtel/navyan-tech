"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersContract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = __importDefault(require("zod"));
const common_schema_1 = require("../common.schema");
const users_schema_1 = require("./users.schema");
const c = (0, core_1.initContract)();
exports.usersContract = c.router({
    getAllUsers: {
        method: "GET",
        path: "/users",
        summary: "get all users details",
        responses: {
            200: users_schema_1.getAllUsersSchema,
            500: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
        },
    },
    getUserDetailsByID: {
        method: "GET",
        path: "/users/details/:userID",
        pathParams: zod_1.default.object({
            UsersID: zod_1.default.string().min(1, "Users ID is required"),
        }),
        summary: "get users details",
        responses: {
            200: users_schema_1.getUserByIDSchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateUserDetails: {
        method: "PUT",
        path: "/users/updateUsersDetails/:userID",
        pathParams: zod_1.default.object({
            UsersID: zod_1.default.string().min(1, "User ID is required"),
        }),
        body: users_schema_1.updateUserByIDSchema,
        summary: "Update user details",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            401: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    removeUser: {
        method: "DELETE",
        path: "/users/:userID",
        body: users_schema_1.removeUserByID,
        summary: "Delete a User",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
