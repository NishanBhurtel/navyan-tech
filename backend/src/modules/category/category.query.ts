import { AppRouteQueryImplementation } from "@ts-rest/express";

import { categoryContract } from "../../contract/categories/category.contract";

import { getAllCategories } from "../../repository/mangodb/category/category.repository";

// Get all categories
export const getAllCategoryMutation: AppRouteQueryImplementation<
  typeof categoryContract.getAllCategory
> = async () => {
  try {
    const categories = await getAllCategories();

    return {
      status: 200,
      body: categories.map((category) => ({
        _id: category._id.toString(),

        name: category.name,
        description: category.description,
      })),
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

export const categoryQueryHandler = {
  getAllCategoryMutation,
};
