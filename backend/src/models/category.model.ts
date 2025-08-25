import mongoose from "mongoose";

interface ICategoryModel extends Document {}

const categorySchema = new mongoose.Schema({});
const CategoryModel = mongoose.model<ICategoryModel>(
  "Category",
  categorySchema
);

export default CategoryModel;
