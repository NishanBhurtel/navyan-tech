"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("@ts-rest/express");
const users_contract_1 = require("../../contract/users/users.contract");
const user_mutation_1 = require("./user.mutation");
const user_query_1 = require("./user.query");
const s = (0, express_1.initServer)();
exports.userRouter = s.router(users_contract_1.usersContract, {
    updateUserDetails: user_mutation_1.userMutationHandler.updateUserDetails,
    removeUser: user_mutation_1.userMutationHandler.removeUser,
    getAllUsers: user_query_1.usersQueryHandler.getAllUsers,
    getUserDetailsByID: user_query_1.usersQueryHandler.getUserDetailsByID,
});
