import SubCategoryModel, {
  ICategoryModel,
} from "../../../models/subCategory.model";
import mongoose from "mongoose";

export const createSubCategoryDB = async (data: {
  name: string;
  description: string;
  parentCategoryId: string;
}): Promise<ICategoryModel> => {
  const subCategory = new SubCategoryModel({
    name: data.name,
    description: data.description,
    parentCategoryId: new mongoose.Types.ObjectId(data.parentCategoryId),
  });

  await subCategory.save();
  return subCategory;
};

export const updateSubCategoryByIDDB = async (
  subcategoryID: string,
  data: { name: string; description: string }
): Promise<ICategoryModel | null> => {
  const objectId = new mongoose.Types.ObjectId(subcategoryID);

  const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    objectId,
    { name: data.name, description: data.description },
    { new: true }
  );

  return updatedSubCategory;
};

export const getAllSubCategoriesDB = async (): Promise<ICategoryModel[]> => {
  const subCategories = await SubCategoryModel.find({});
  return subCategories;
};

export const removeSubCategoryByIDDB = async (
  subcategoryID: string
): Promise<ICategoryModel | null> => {
  const objectId = new mongoose.Types.ObjectId(subcategoryID);

  const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(objectId);

  return deletedSubCategory;
};
