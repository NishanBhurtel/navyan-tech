import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";

import OrderRepository from "../../repository/mongodb/order/order.repository";
import { orderContract } from "../../contract/order/order.contract";

const getAllOrders: AppRouteImplementationOrOptions<
  typeof orderContract.getAllOrders
> = async ({ req }) => {
  try {
    const orders = await OrderRepository.getAllOrders();

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


const orderQueryHandlers = {
  getAllOrders,
};

export default orderQueryHandlers;
