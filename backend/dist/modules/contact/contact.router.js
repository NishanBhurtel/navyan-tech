"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("@ts-rest/express");
const contact_contract_1 = require("../../contract/contact/contact.contract");
const contact_mutation_1 = require("./contact.mutation");
const s = (0, express_1.initServer)();
exports.contactRouter = s.router(contact_contract_1.contactContract, {
    createContact: contact_mutation_1.contactMutationHandler.sendMessageMutation,
});
