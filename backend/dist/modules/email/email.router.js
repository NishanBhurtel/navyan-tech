"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = require("@ts-rest/express");
const email_contract_1 = require("../../contract/email/email.contract");
const email_mutation_1 = require("./email.mutation");
const s = (0, express_1.initServer)();
exports.emailRouter = s.router(email_contract_1.emailContract, {
    sendMail: email_mutation_1.emailMutationHandler.sentMailMutation,
});
