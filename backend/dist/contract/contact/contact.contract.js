"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactContract = void 0;
const core_1 = require("@ts-rest/core");
const common_schema_1 = require("../common.schema");
const contact_schema_1 = require("./contact.schema");
const c = (0, core_1.initContract)();
exports.contactContract = c.router({
    createContact: {
        method: "POST",
        path: "/api/contact",
        body: contact_schema_1.createContactSchema,
        summary: "Create a contact ",
        responses: {
            200: contact_schema_1.contactSuccessSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
