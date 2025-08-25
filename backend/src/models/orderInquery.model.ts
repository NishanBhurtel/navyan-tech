import mongoose from "mongoose";

interface IOrderInquery extends Document {}

const OrderInquerySchema = new mongoose.Schema({});

const OrderInqueryModel = mongoose.model<IOrderInquery>(
  "OrderInquery",
  OrderInquerySchema
);

export default OrderInqueryModel;
