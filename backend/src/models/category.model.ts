import mongoose from "mongoose";

interface ICategoryModel extends Document {
  name: string;
  description: string;
}


const categorySchema = new mongoose.Schema<ICategoryModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
},
 {
  timestamps: true
});
const CategoryModel = mongoose.model<ICategoryModel>(
  "Category",
  categorySchema
);

export default CategoryModel;



// row          document
// column       field
// table        collection
// db           db                  