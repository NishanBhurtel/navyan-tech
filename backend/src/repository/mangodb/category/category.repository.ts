import CategoryModel from "../../../models/category.model";

// Input interfaces
interface CreateCategoryInput {
  name: string;
  description: string;
}

interface UpdateCategoryInput {
  _id: string;
  name: string;
  description: string;
}

// Create a category
export async function createCategory(data: CreateCategoryInput) {
  try {
    const category = new CategoryModel(data);
    const savedCategory = await category.save();
    return savedCategory;
  } catch (error) {
    throw new Error("Failed to create category: " + (error as Error).message);
  }
}

// get all category
export const getAllCategories = async () => {
  return await CategoryModel.find({});
};
// Update a category by ID
export async function updateCategoryByID({
  _id,
  name,
  description,
}: UpdateCategoryInput) {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    _id,
    { name, description },
    { new: true } // returns the updated document
  );
  return updatedCategory;
}

export const removeCategoryByID = async (categoryID: string) => {
  return await CategoryModel.findByIdAndDelete(categoryID);
};
