"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMutationHandlers = void 0;
const order_repository_1 = __importDefault(require("../../repository/mangodb/order/order.repository"));
const order_model_1 = require("../../models/order.model");
const createOrder = async ({ body }) => {
    try {
        const { personalInformation, shippingAddress, additionalInformation, preferredContactMethod, totalPrice, productID, quantity, } = body;
        // Convert string to enum
        let contactMethod;
        switch (preferredContactMethod) {
            case "email":
                contactMethod = order_model_1.ContactMethod.EMAIL;
                break;
            case "phone":
                contactMethod = order_model_1.ContactMethod.PHONE;
                break;
            case "whatsapp":
                contactMethod = order_model_1.ContactMethod.WHATSAPP;
                break;
            default:
                return {
                    status: 400,
                    body: { success: false, error: "Invalid contact method" },
                };
        }
        // Validate required contact info
        if (contactMethod === order_model_1.ContactMethod.EMAIL && !personalInformation.email) {
            return {
                status: 400,
                body: { success: false, error: "Email is required" },
            };
        }
        if ((contactMethod === order_model_1.ContactMethod.PHONE ||
            contactMethod === order_model_1.ContactMethod.WHATSAPP) &&
            !personalInformation.phoneNumber) {
            return {
                status: 400,
                body: { success: false, error: "Phone number is required" },
            };
        }
        // Create order
        const order = await order_repository_1.default.create({
            personalInformation,
            shippingAddress,
            additionalInformation,
            preferredContactMethod: contactMethod,
            totalPrice,
            productID,
            quantity: quantity ?? 1,
        });
        return { status: 201, body: order };
    }
    catch (error) {
        console.error("Create order error:", error);
        return {
            status: 500,
            body: { success: false, error: "Error while creating order" },
        };
    }
};
exports.orderMutationHandlers = { createOrder };
