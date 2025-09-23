import { AppRouteImplementation } from "@ts-rest/express";
import orderRepository from "../../repository/mongodb/order/order.repository";
import { orderContract } from "../../contract/order/order.contract";
import { ContactMethod } from "../../models/order.model";

const createOrder: AppRouteImplementation<
  typeof orderContract.createOrder
> = async ({ body }) => {
  try {
    const {
      personalInformation,
      shippingAddress,
      additionalInformation,
      preferredContactMethod,
      totalPrice,
      productID,
      quantity,
    } = body;
    // Convert string to enum
    let contactMethod: ContactMethod;
    switch (preferredContactMethod) {
      case "email":
        contactMethod = ContactMethod.EMAIL;
        break;
      case "phone":
        contactMethod = ContactMethod.PHONE;
        break;
      case "whatsapp":
        contactMethod = ContactMethod.WHATSAPP;
        break;
      default:
        return {
          status: 400,
          body: { success: false, error: "Invalid contact method" },
        };
    }

    // Validate required contact info
    if (contactMethod === ContactMethod.EMAIL && !personalInformation.email) {
      return {
        status: 400,
        body: { success: false, error: "Email is required" },
      };
    }
    if (
      (contactMethod === ContactMethod.PHONE ||
        contactMethod === ContactMethod.WHATSAPP) &&
      !personalInformation.phoneNumber
    ) {
      return {
        status: 400,
        body: { success: false, error: "Phone number is required" },
      };
    }

    // Create order
    const order = await orderRepository.create({
      personalInformation,
      shippingAddress,
      additionalInformation,
      preferredContactMethod: contactMethod,
      totalPrice,
      productID,
      quantity: quantity ?? 1,
    });

    return { status: 201, body: order };
  } catch (error: any) {
    console.error("Create order error:", error);
    return {
      status: 500,
      body: { success: false, error: "Error while creating order" },
    };
  }
};

export const orderMutationHandlers = { createOrder };
