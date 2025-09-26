"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const order_model_1 = __importDefault(require("../../../models/order.model"));
const product_model_1 = __importDefault(require("../../../models/product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class OrderRepository {
    OrderModel;
    constructor() {
        this.OrderModel = order_model_1.default;
    }
    async create(orderData) {
        try {
            const product = await product_model_1.default.findById(orderData.productID);
            if (!product)
                throw new Error("Product not found");
            const order = new this.OrderModel({
                personalInformation: orderData.personalInformation,
                shippingAddress: orderData.shippingAddress,
                preferredContactMethod: orderData.preferredContactMethod,
                additionalInformation: orderData.additionalInformation || { notes: "" },
                quantity: orderData.quantity,
                productID: orderData.productID,
                totalPrice: orderData.totalPrice,
            });
            const savedOrder = await order.save();
            return savedOrder.toObject();
        }
        catch (error) {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
                const validationErrors = Object.values(error.errors).map((err) => err.message);
                throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
            }
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }
    async getAllOrders() {
        try {
            const orders = await this.OrderModel.find()
                .sort({ createdAt: -1 })
                .populate("productID").lean();
            return orders.map((order) => ({
                _id: order._id.toString(),
                customer: `${order.personalInformation.firstName} ${order.personalInformation.lastName}`,
                email: order.personalInformation.email,
                phoneNumber: order.personalInformation.phoneNumber.toString(),
                shippingAddress: order.shippingAddress, // include shipping
                productName: order.productID?.name || "Unknown Product",
                amount: order.totalPrice || 0,
                quantity: order.quantity || 0,
                additionalInformation: order.additionalInformation || { notes: "" },
                preferredContactMethod: order.preferredContactMethod,
                createdAt: order.createdAt.toISOString(),
            }));
        }
        catch (error) {
            throw new Error(`Failed to fetch orders: ${error.message}`);
        }
    }
}
exports.OrderRepository = OrderRepository;
const orderRepository = new OrderRepository();
exports.default = orderRepository;
