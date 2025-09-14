// import Order, { IOrder, ContactMethod } from "../../../models/order.model";
// import Product, { IProductModel } from "../../../models/product.model";
// import mongoose from "mongoose";

// export class OrderRepository {
//   private OrderModel;

//   constructor() {
//     this.OrderModel = Order;
//   }

//   async create(orderData: {
//     personalInformation: IOrder["personalInformation"];
//     shippingAddress: IOrder["shippingAddress"];
//     additionalInformation?: IOrder["additionalInformation"];
//     preferredContactMethod: ContactMethod;
//     productId: string;
//     quantity: IOrder["quantity"];
//   }): Promise<IOrder> {
//     try {
//       // Fetch product details
//       const product = await Product.findById(orderData.productId);
//       if (!product) throw new Error("Product not found");

//       const order = new this.OrderModel({
//         personalInformation: orderData.personalInformation,
//         shippingAddress: orderData.shippingAddress,
//         preferredContactMethod: orderData.preferredContactMethod,
//         additionalInformation: orderData.additionalInformation || { notes: "" },
//         quantity: orderData.quantity,
//         product: {
//           productId: product._id,
//           productName: product.name,
//           discountedPrice: product.discountedPrice,
//         },
//       });

//       const savedOrder = await order.save();
//       return savedOrder.toObject();
//     } catch (error: any) {
//       if (error instanceof mongoose.Error.ValidationError) {
//         const validationErrors = Object.values(error.errors).map(
//           (err: any) => err.message
//         );
//         throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
//       }
//       throw new Error(`Failed to create order: ${error.message}`);
//     }
//   }

//   async getAllOrders() {
//     try {
//       const orders = await this.OrderModel.find()
//         .sort({ createdAt: -1 })
//         .lean();

//       const result = await Promise.all(
//         orders.map(async (order: any) => {
//           let productName = "Unknown Product";
//           let amount = 0;
//           let quantity = 0;

//           if (order.product) {
//             productName = order.product.productName;
//             amount = order.product.discountedPrice;

//             // fetch current product quantity from Product model
//             const productInDb = await Product.findById(
//               order.product.productId
//             ).lean();
//             if (productInDb) {
//               quantity = productInDb.stock || 0;
//             }
//           } else if (order.productId) {
//             const product = await Product.findById(order.productId).lean();
//             if (product) {
//               productName = product.name;
//               amount = product.discountedPrice;
//               quantity = product.stock || 0;
//             }
//           }

//           return {
//             customer: `${order.personalInformation.firstName} ${order.personalInformation.lastName}`,
//             email: order.personalInformation.email,
//             phoneNumber: order.personalInformation.phoneNumber.toString(),
//             address: order.streetAddress.address,
//             productName,
//             amount,
//             quantity, // <-- this now reflects current stock
//             createdAt: order.createdAt.toISOString(),
//           };
//         })
//       );

//       return result;
//     } catch (error: any) {
//       throw new Error(`Failed to fetch orders: ${error.message}`);
//     }
//   }

//   async getOrderDetailsById(orderId: string) {
//     try {
//       const orderDetails = await this.OrderModel.findById(orderId);

//       if (!orderDetails) {
//         return {
//           status: 404,
//           body: {
//             success: false,
//             error: "order not found",
//           },
//         };
//       }

//       return {
//         status: 200,
//         body: {
//           success: true,
//           data: {
//             _id: orderDetails._id.toString(),
//             name:
//               orderDetails.personalInformation.firstName +
//               " " +
//               orderDetails.personalInformation.lastName,
//             email: orderDetails.personalInformation.email,
//             phoneNumber:
//               orderDetails.personalInformation.phoneNumber.toString(),
//             productName: orderDetails.product.productName,
//             amount: orderDetails.product.discountedPrice,
//             createdAt: orderDetails.createdAt.toISOString(),
//           },
//         },
//       };
//     } catch (error) {
//       throw new Error(
//         `Error while getting order  details from order Id:${error}`
//       );
//     }
//   }
// }

// const orderRepository = new OrderRepository();
// export default orderRepository;

import Order, { IOrder, ContactMethod } from "../../../models/order.model";
import Product from "../../../models/product.model";
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
    productId: string;
    quantity: IOrder["quantity"];
  }): Promise<IOrder> {
    try {
      const product = await Product.findById(orderData.productId);
      if (!product) throw new Error("Product not found");

      const order = new this.OrderModel({
        personalInformation: orderData.personalInformation,
        shippingAddress: orderData.shippingAddress,
        preferredContactMethod: orderData.preferredContactMethod,
        additionalInformation: orderData.additionalInformation || { notes: "" },
        quantity: orderData.quantity,
        product: {
          productId: product._id,
          productName: product.name,
          discountedPrice: product.discountedPrice,
        },
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
        .lean();

      return orders.map((order: any) => ({
        _id: order._id.toString(),
        customer: `${order.personalInformation.firstName} ${order.personalInformation.lastName}`,
        email: order.personalInformation.email,
        phoneNumber: order.personalInformation.phoneNumber.toString(),
        shippingAddress: order.shippingAddress, // include shipping
        productName: order.product?.productName || "Unknown Product",
        amount: order.product?.discountedPrice || 0,
        quantity: order.quantity || 0,
        additionalInformation: order.additionalInformation || { notes: "" },
        preferredContactMethod: order.preferredContactMethod,
        createdAt: order.createdAt.toISOString(),
      }));
    } catch (error: any) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async getOrderDetailsById(orderId: string) {
    try {
      const orderDetails = await this.OrderModel.findById(orderId).lean();

      if (!orderDetails) {
        return {
          status: 404,
          body: { success: false, error: "order not found" },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: {
            _id: orderDetails._id.toString(),
            customer: `${orderDetails.personalInformation.firstName} ${orderDetails.personalInformation.lastName}`,
            email: orderDetails.personalInformation.email,
            phoneNumber:
              orderDetails.personalInformation.phoneNumber.toString(),
            shippingAddress: orderDetails.shippingAddress, // included here too
            productName: orderDetails.product?.productName || "Unknown Product",
            amount: orderDetails.product?.discountedPrice || 0,
            quantity: orderDetails.quantity || 0,
            additionalInformation: orderDetails.additionalInformation || {
              notes: "",
            },
            preferredContactMethod: orderDetails.preferredContactMethod,
            createdAt: orderDetails.createdAt.toISOString(),
          },
        },
      };
    } catch (error: any) {
      throw new Error(
        `Error while getting order details from order Id: ${error.message}`
      );
    }
  }
}

const orderRepository = new OrderRepository();
export default orderRepository;
