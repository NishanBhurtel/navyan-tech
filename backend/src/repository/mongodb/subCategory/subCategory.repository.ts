import SubCategoryModel, {
  ICategoryModel,
} from "../../../models/subCategory.model";
import mongoose from "mongoose";

const createSubCategoryDB = async (data: {
  name: string;
  description?: string;
  parentCategoryId: string;
}): Promise<ICategoryModel> => {

  console.log(data.description)
  const subCategory = new SubCategoryModel({
    name: data.name,
    description: data.description,
    parentCategoryId: new mongoose.Types.ObjectId(data.parentCategoryId),
  });

  await subCategory.save();
  return subCategory;
};

const updateSubCategoryByIDDB = async (
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

const getAllSubCategoriesDB = async (): Promise<ICategoryModel[]> => {
  const subCategories = await SubCategoryModel.find({});
  return subCategories;
};

const getSubCategoriesByParentCategoryID = async (
  subcategoryID: string
): Promise<ICategoryModel[]> => {
  const subCategories = await SubCategoryModel.find({
    parentCategoryId: new mongoose.Types.ObjectId(subcategoryID),
  });
  return subCategories;
};

const removeSubCategoryByIDDB = async (
  subcategoryID: string
): Promise<ICategoryModel | null> => {
  const objectId = new mongoose.Types.ObjectId(subcategoryID);

  const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(objectId);

  return deletedSubCategory;
};

const subCategoryRepository = {
  getSubCategoriesByParentCategoryID,
  createSubCategoryDB,
  updateSubCategoryByIDDB,
  getAllSubCategoriesDB,
  removeSubCategoryByIDDB,
};

export default subCategoryRepository;
