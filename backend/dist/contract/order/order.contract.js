"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderContract = void 0;
const core_1 = require("@ts-rest/core");
const order_schema_1 = require("./order.schema");
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.orderContract = c.router({
    createOrder: {
        method: "POST",
        path: "/order",
        body: order_schema_1.createOrderSchema,
        summary: "Create a order",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getAllOrders: {
        method: "GET",
        path: "/orders/admin",
        responses: {
            200: order_schema_1.getAllOrdersSchema,
            500: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            400: common_schema_1.errorSchema,
        },
        summary: "Get all orders for admin",
    },
});
