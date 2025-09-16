"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContract = void 0;
const core_1 = require("@ts-rest/core");
const auth_schema_1 = require("./auth.schema");
const zod_1 = __importDefault(require("zod"));
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.authContract = c.router({
    register: {
        method: "POST",
        path: "/auth/register",
        body: auth_schema_1.registerSchema,
        summary: "create a user",
        responses: {
            201: common_schema_1.successSchema.extend({
                userId: zod_1.default.string(),
            }),
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    login: {
        method: "POST",
        path: "/auth/login",
        body: auth_schema_1.loginSchema,
        summary: "login user",
        responses: {
            200: auth_schema_1.loginResponseSchema,
            404: common_schema_1.errorSchema,
            401: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getTotalNumberOfUsers: {
        method: "GET",
        path: "/users/all",
        summary: "Get total number of  users",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
