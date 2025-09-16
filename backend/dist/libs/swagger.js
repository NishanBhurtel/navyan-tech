"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = void 0;
// openapi.ts
const open_api_1 = require("@ts-rest/open-api");
const contract_1 = require("../contract");
exports.openApiDocument = (0, open_api_1.generateOpenApi)(contract_1.contract, {
    info: {
        title: "Your API Title",
        version: "1.0.0",
    },
    baseUrl: "http://localhost:4000", // Your API base URL
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
});
