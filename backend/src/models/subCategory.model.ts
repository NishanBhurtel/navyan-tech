import mongoose from "mongoose";

interface ICategoryModel extends Document {
  name:string;
  description:string;
  parentCategoryId:mongoose.Schema.Types.ObjectId;
}

const subCategorySchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  parentCategoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
})

const SubCategoryModel = mongoose.model<ICategoryModel>(
  "subCategory",
  subCategorySchema
);

export default SubCategoryModel;