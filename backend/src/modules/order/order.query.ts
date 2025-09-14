import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";

import OrderRepository from "../../repository/mangodb/order/order.repository";
import { orderContract } from "../../contract/order/order.contract";

const getAllOrders: AppRouteImplementationOrOptions<
  typeof orderContract.getAllOrders
> = async ({ req }) => {
  try {
    const orders = await OrderRepository.getAllOrders(); // returns objects with shippingAddress

    const data = orders.map((order) => ({
      customer: order.customer,
      email: order.email,
      phoneNumber: order.phoneNumber,
      address: `${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`,
      productName: order.productName,
      amount: order.amount,
      quantity: order.quantity,
    }));

    return {
      status: 200,
      body: {
        success: true,
        data,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      body: {
        success: false,
        error: `Error while getting all orders: ${error.message}`,
      },
    };
  }
};

const getOrderDetailsById: AppRouteImplementationOrOptions<
  typeof orderContract.getOrderDetailsById
> = async ({ req }) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return {
        status: 400,
        body: {
          success: false,
          error: "orderId is required",
        },
      };
    }

    // Fetch order details from repository
    const response = await OrderRepository.getOrderDetailsById(orderId);

    // Check if order exists
    if (!response.body.data) {
      return {
        status: 404,
        body: {
          success: false,
          error: response.body.error || "Order not found",
        },
      };
    }

    const order = response.body.data;

    return {
      status: 200,
      body: {
        success: true,
        customer: order.customer,
        email: order.email,
        phoneNumber: order.phoneNumber,
        address: order.shippingAddress.city || "", // ✅ lowercase to match schema
        preferredContactMethod: order.preferredContactMethod || "EMAIL", // fallback string, matches schema
        productName: order.productName,
        quantity: order.quantity || 1,
        amount: order.amount,
        createdAt: new Date(order.createdAt).toISOString(), // include createdAt to match schema
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      body: {
        success: false,
        error: `Server error while fetching order: ${error.message}`,
      },
    };
  }
};

const orderQueryHandlers = {
  getAllOrders,
  getOrderDetailsById,
};

export default orderQueryHandlers;
