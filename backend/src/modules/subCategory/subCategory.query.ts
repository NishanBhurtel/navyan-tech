// import { AppRouteQueryImplementation } from "@ts-rest/express";
import { AppRouteQueryImplementation } from "@ts-rest/express";

import { subCategoryContract } from "../../contract/subcategories/subcategory.contract";

import { getAllSubCategoriesDB } from "../../repository/mangodb/subCategory/subCategory.repository";

const getAllSubCategory: AppRouteQueryImplementation<
  typeof subCategoryContract.getSubCategoriesByCategoryID
> = async () => {
  try {
    const subCategories = await getAllSubCategoriesDB();

    return {
      status: 200,
      body: subCategories.map((i) => ({
        _id: i._id.toString(),
        parentCategoryId: i.parentCategoryId.toString(),
        name: i.name,
        description: i.description,
      })),
    };
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to fetch subcategories",
      },
    };
  }
};

export const SubCategoryQueryHandler = {
  getAllSubCategory,
};
