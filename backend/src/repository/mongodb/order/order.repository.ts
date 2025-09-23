import Order, { IOrder, ContactMethod } from "../../../models/order.model";
import Product, { IProductModel } from "../../../models/product.model";
import mongoose from "mongoose";

export class OrderRepository {
  private OrderModel;

  constructor() {
    this.OrderModel = Order;
  }

  async create(orderData: {
    personalInformation: IOrder["personalInformation"];
    shippingAddress: IOrder["shippingAddress"];
    additionalInformation?: IOrder["additionalInformation"];
    preferredContactMethod: ContactMethod;
    productID:string;
    quantity: IOrder["quantity"];
    totalPrice: IOrder["totalPrice"];
  }): Promise<IOrder> {

    try {
      const product = await Product.findById(orderData.productID);
      if (!product) throw new Error("Product not found");

      const order = new this.OrderModel({
        personalInformation: orderData.personalInformation,
        shippingAddress: orderData.shippingAddress,
        preferredContactMethod: orderData.preferredContactMethod,
        additionalInformation: orderData.additionalInformation || { notes: "" },
        quantity: orderData.quantity,
        productID:orderData.productID,
        totalPrice: orderData.totalPrice,
      });

      const savedOrder = await order.save();
      return savedOrder.toObject();
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.OrderModel.find()
        .sort({ createdAt: -1 })
        .populate<{
        productID:IProductModel
      }>("productID").lean();

      return orders.map((order: any) => ({
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
    } catch (error: any) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }
}

const orderRepository = new OrderRepository();
export default orderRepository;
