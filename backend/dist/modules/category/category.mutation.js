"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryMutationHandler = exports.deleteCategoryMutation = exports.updateCategoryMutation = exports.createCategoryMutation = void 0;
const category_repository_1 = require("../../repository/mangodb/category/category.repository");
// Create Category Mutation
const createCategoryMutation = async ({ req }) => {
    try {
        const { name, description } = req.body;
        const category = await (0, category_repository_1.createCategory)({
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
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: "Error creating category",
            },
        };
    }
};
exports.createCategoryMutation = createCategoryMutation;
// Update Category Mutation
const updateCategoryMutation = async ({ req }) => {
    try {
        const { categoryID } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await (0, category_repository_1.updateCategoryByID)({
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
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: error.message,
            },
        };
    }
};
exports.updateCategoryMutation = updateCategoryMutation;
const deleteCategoryMutation = async ({ req }) => {
    try {
        const { categoryID } = req.params;
        const deletedCategory = await (0, category_repository_1.removeCategoryByID)(categoryID);
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
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: error.message,
            },
        };
    }
};
exports.deleteCategoryMutation = deleteCategoryMutation;
// Export handler object
exports.categoryMutationHandler = {
    createCategory: exports.createCategoryMutation,
    updateCategoryDetailsByID: exports.updateCategoryMutation,
    removeCategoryByID: exports.deleteCategoryMutation,
};
