"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("@ts-rest/express");
const auth_contract_1 = require("../../contract/auth/auth.contract");
const auth_mutation_1 = require("./auth.mutation");
const auth_query_1 = __importDefault(require("./auth.query"));
const s = (0, express_1.initServer)();
exports.authRouter = s.router(auth_contract_1.authContract, {
    register: auth_mutation_1.authMutationHandler.registerUser,
    login: auth_mutation_1.authMutationHandler.loginUser,
    getTotalNumberOfUsers: auth_query_1.default.getTotalNumberOfUsers,
});
