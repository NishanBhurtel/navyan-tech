"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_repository_1 = __importDefault(require("../../repository/mongodb/order/order.repository"));
const getAllOrders = async ({ req }) => {
    try {
        const orders = await order_repository_1.default.getAllOrders();
        const data = orders.map((order) => ({
            id: order._id,
            customer: order.customer,
            email: order.email,
            phoneNumber: order.phoneNumber,
            address: `${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`,
            productName: order.productName,
            amount: order.amount,
            quantity: order.quantity,
            createdAt: order.createdAt,
            notes: order.additionalInformation?.notes ?? "",
            contactMethod: order.preferredContactMethod,
        }));
        return {
            status: 200,
            body: {
                success: true,
                data,
            },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: `Error while getting all orders: ${error.message}`,
            },
        };
    }
};
const orderQueryHandlers = {
    getAllOrders,
};
exports.default = orderQueryHandlers;
