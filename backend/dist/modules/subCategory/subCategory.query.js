"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryQueryHandler = void 0;
const subCategory_repository_1 = __importDefault(require("../../repository/mongodb/subCategory/subCategory.repository"));
const getSubCategoriesByCategoryID = async ({ params }) => {
    try {
        const subCategories = await subCategory_repository_1.default.getSubCategoriesByParentCategoryID(params.categoryID);
        return {
            status: 200,
            body: subCategories.map((i) => ({
                _id: i._id.toString(),
                parentCategoryId: i.parentCategoryId.toString(),
                name: i.name,
                description: i.description,
            })),
        };
    }
    catch (error) {
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
exports.SubCategoryQueryHandler = {
    getSubCategoriesByCategoryID,
};
