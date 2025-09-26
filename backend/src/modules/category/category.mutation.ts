import { AppRouteMutationImplementation } from "@ts-rest/express";
import { categoryContract } from "../../contract/categories/category.contract";
import {
  createCategory,
  removeCategoryByID,
  updateCategoryByID,
} from "../../repository/mongodb/category/category.repository";

// Create Category Mutation
export const createCategoryMutation: AppRouteMutationImplementation<
  typeof categoryContract.createCategory
> = async ({ req }) => {
  try {
    const { name, description } = req.body;

    const category = await createCategory({
      name,
      description,
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "Category created successfully",
        categoryID: category._id.toString(),
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: "Error creating category",
      },
    };
  }
};

// Update Category Mutation
export const updateCategoryMutation: AppRouteMutationImplementation<
  typeof categoryContract.updateCategoryDetailsByID
> = async ({ req }) => {
  try {
    const { categoryID } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await updateCategoryByID({
      _id: categoryID,
      name,
      description,
    });

    if (!updatedCategory) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Category not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Category updated successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: (error as Error).message,
      },
    };
  }
};

export const deleteCategoryMutation: AppRouteMutationImplementation<
  typeof categoryContract.removeCategoryByID
> = async ({ req }) => {
  try {
    const { categoryID } = req.params;

    const deletedCategory = await removeCategoryByID(categoryID);

    if (!deletedCategory) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Category not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Category deleted successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: (error as Error).message,
      },
    };
  }
};

// Export handler object
export const categoryMutationHandler = {
  createCategory: createCategoryMutation,
  updateCategoryDetailsByID: updateCategoryMutation,
  removeCategoryByID: deleteCategoryMutation,
};
