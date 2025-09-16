"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryQueryHandler = void 0;
const category_repository_1 = require("../../repository/mangodb/category/category.repository");
const subCategory_repository_1 = __importDefault(require("../../repository/mangodb/subCategory/subCategory.repository"));
// Get all categories
const getAllCategoryMutation = async () => {
    try {
        const categories = await (0, category_repository_1.getAllCategories)();
        return {
            status: 200,
            body: await Promise.all(categories.map(async (category) => {
                const subCategories = await subCategory_repository_1.default.getSubCategoriesByParentCategoryID(category._id.toString());
                return {
                    _id: category._id.toString(),
                    name: category.name,
                    description: category.description,
                    subCategories: subCategories.map((i) => ({
                        _id: i._id.toString(),
                        name: i.name,
                        description: i.description,
                        parentCategoryId: i.parentCategoryId.toString(),
                    })),
                };
            })),
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: 500,
            body: {
                success: false,
                error: error.message,
            },
        };
    }
};
exports.categoryQueryHandler = {
    getAllCategoryMutation,
};
