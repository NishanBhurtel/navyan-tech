"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("@ts-rest/express");
const order_contract_1 = require("../../contract/order/order.contract");
const order_mutation_1 = require("./order.mutation");
const order_query_1 = __importDefault(require("./order.query"));
const s = (0, express_1.initServer)();
exports.orderRouter = s.router(order_contract_1.orderContract, {
    createOrder: order_mutation_1.orderMutationHandlers.createOrder,
    getAllOrders: order_query_1.default.getAllOrders,
});
