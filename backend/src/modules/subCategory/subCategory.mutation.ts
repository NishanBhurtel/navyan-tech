import { AppRouteMutationImplementation } from "@ts-rest/express";
import { subCategoryContract } from "../../contract/subcategories/subcategory.contract";
import subCategoryRepository from "../../repository/mangodb/subCategory/subCategory.repository";

export const createSubCategory: AppRouteMutationImplementation<
  typeof subCategoryContract.createCategory
> = async ({ req }) => {
  try {
    const { name, description, parentCategoryId } = req.body;

    const subCategory = await subCategoryRepository.createSubCategoryDB({
      name,
      description,
      parentCategoryId,
    });

    return {
      status: 201,
      body: {
        success: true,
        subcategoryID: subCategory._id.toString(), // TS now recognizes _id
      },
    };
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to create subcategory",
      },
    };
  }
};

export const updateSubCategoryDetailsByID: AppRouteMutationImplementation<
  typeof subCategoryContract.updateSubCategoryDetailsByID
> = async ({ req }) => {
  try {
    const { subcategoryID } = req.params;
    const { name, description } = req.body;

    const updatedSubCategory = await subCategoryRepository.updateSubCategoryByIDDB(subcategoryID, {
      name,
      description,
    });

    if (!updatedSubCategory) {
      return {
        status: 404,
        body: {
          success: false,
          error: "SubCategory not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "SubCategory updated successfully",
      },
    };
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to update subcategory",
      },
    };
  }
};

export const removeSubCategoryByID: AppRouteMutationImplementation<
  typeof subCategoryContract.removeSubCategoryByID
> = async ({ req }) => {
  try {
    const { subcategoryID } = req.params; // because your schema has it in body

    const deletedSubCategory = await subCategoryRepository.removeSubCategoryByIDDB(subcategoryID);

    if (!deletedSubCategory) {
      return {
        status: 404,
        body: {
          success: false,
          error: "SubCategory not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "SubCategory removed successfully",
      },
    };
  } catch (error) {
    console.error("Error removing subcategory:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to remove subcategory",
      },
    };
  }
};
export const subCategoryMutationHandler = {
  createSubCategory,
  updateSubCategoryDetailsByID,
  removeSubCategoryByID,
};
