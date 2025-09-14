import mongoose from "mongoose";

export enum ContactMethod {
  PHONE = "phone",
  WHATSAPP = "whatsapp",
  EMAIL = "email",
}

export interface IOrder {
  orderId: string;
  personalInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  shippingAddress: {
    streetAddress: string;
    city: string;
    state: string;
    zip: number;
  };
  additionalInformation?: {
    notes?: string;
  };
  preferredContactMethod: ContactMethod;

  product: {
    productId: mongoose.Schema.Types.ObjectId;
    productName: string;
    discountedPrice: number;
  };
  quantity: number;

  createdAt: Date;
  updatedAt: Date;
  _id?: string;
}

const orderSchema = new mongoose.Schema(
  {
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
    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      discountedPrice: {
        type: Number,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
