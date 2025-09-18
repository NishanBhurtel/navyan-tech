import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for SubCategory
export interface ICategoryModel extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  parentCategoryId: Types.ObjectId;
}

// Mongoose schema
const subCategorySchema = new Schema<ICategoryModel>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategoryModel = mongoose.model<ICategoryModel>(
  "SubCategory",
  subCategorySchema
);

export default SubCategoryModel;
