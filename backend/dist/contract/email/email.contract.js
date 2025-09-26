"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContract = void 0;
const core_1 = require("@ts-rest/core");
const common_schema_1 = require("../common.schema");
const email_schema_1 = require("./email.schema");
const c = (0, core_1.initContract)();
exports.emailContract = c.router({
    sendMail: {
        method: "POST",
        path: "/email/send",
        body: email_schema_1.emailSchema,
        summary: "send an email",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    sendEmailToSpecificUser: {
        method: "POST",
        path: "/api/emailToOrderedUser",
        summary: "sent email to specific user",
        body: email_schema_1.emailSchemaToSpecificUser,
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
