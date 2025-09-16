"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersSchema = exports.preferredContactMethodSchema = exports.createOrderSchema = exports.additionalInformationSchema = exports.shippingAddressSchema = exports.personalInformationSchema = exports.contactMethodSchema = void 0;
const zod_1 = require("zod");
exports.contactMethodSchema = zod_1.z.enum(["phone", "whatsapp", "email"]);
exports.personalInformationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2).max(50),
    lastName: zod_1.z.string().min(2).max(50),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string(),
});
exports.shippingAddressSchema = zod_1.z.object({
    streetAddress: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    zip: zod_1.z.number(),
});
exports.additionalInformationSchema = zod_1.z.object({
    notes: zod_1.z.string().max(500).optional(),
});
exports.createOrderSchema = zod_1.z.object({
    personalInformation: exports.personalInformationSchema,
    shippingAddress: exports.shippingAddressSchema,
    additionalInformation: exports.additionalInformationSchema.optional(),
    preferredContactMethod: exports.contactMethodSchema,
    productID: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().min(1, "Quantity is required"),
    totalPrice: zod_1.z.number().min(1, "Total Price is required"),
});
exports.preferredContactMethodSchema = zod_1.z.object({
    method: exports.contactMethodSchema,
});
exports.getAllOrdersSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        customer: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phoneNumber: zod_1.z.string(),
        address: zod_1.z.string(),
        amount: zod_1.z.number(),
        quantity: zod_1.z.number(),
        createdAt: zod_1.z.string(),
        notes: zod_1.z.string(),
    })),
});
