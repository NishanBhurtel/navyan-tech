"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMethod = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var ContactMethod;
(function (ContactMethod) {
    ContactMethod["PHONE"] = "phone";
    ContactMethod["WHATSAPP"] = "whatsapp";
    ContactMethod["EMAIL"] = "email";
})(ContactMethod || (exports.ContactMethod = ContactMethod = {}));
const orderSchema = new mongoose_1.default.Schema({
    personalInformation: {
        firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
        lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
        email: {
            type: String,
            required: true,
            lowercase: true,
            match: /^\S+@\S+\.\S+$/,
        },
        phoneNumber: { type: String, required: true },
    },
    shippingAddress: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
    },
    additionalInformation: {
        notes: { type: String, maxlength: 500, default: "" },
    },
    preferredContactMethod: {
        type: String,
        enum: Object.values(ContactMethod),
        required: true,
    },
    productID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
