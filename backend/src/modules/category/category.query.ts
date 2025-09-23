import { AppRouteQueryImplementation } from "@ts-rest/express";

import { categoryContract } from "../../contract/categories/category.contract";

import { getAllCategories } from "../../repository/mongodb/category/category.repository";
import subCategoryRepository from "../../repository/mongodb/subCategory/subCategory.repository";
import { promise } from "zod";
import productRepository from "../../repository/mongodb/product/product.repository";

// Get all categories
const getAllCategoryMutation: AppRouteQueryImplementation<
  typeof categoryContract.getAllCategory
> = async () => {
  try {
    const categories = await getAllCategories();

    return {
      status: 200,
      body: await Promise.all(
        categories.map(async (category) => {
          const subCategories =
            await subCategoryRepository.getSubCategoriesByParentCategoryID(
              category._id.toString()
            );
          const totalItems = await productRepository.countProducts({
            categoryID: category._id.toString(),
          });

          return {
            _id: category._id.toString(),
            name: category.name,
            description: category.description,
            totalItems,
            subCategories: subCategories.map((i) => ({
              _id: i._id.toString(),
              name: i.name,
              description: i.description,
              parentCategoryId: i.parentCategoryId.toString(),
            })),
          };
        })
      ),
    };
  } catch (error) {
    console.log(error);
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
