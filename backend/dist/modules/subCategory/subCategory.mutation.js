"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryMutationHandler = exports.removeSubCategoryByID = exports.updateSubCategoryDetailsByID = exports.createSubCategory = void 0;
const subCategory_repository_1 = __importDefault(require("../../repository/mongodb/subCategory/subCategory.repository"));
const createSubCategory = async ({ req }) => {
    try {
        const { name, description, parentCategoryId } = req.body;
        const subCategory = await subCategory_repository_1.default.createSubCategoryDB({
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
    }
    catch (error) {
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
exports.createSubCategory = createSubCategory;
const updateSubCategoryDetailsByID = async ({ req }) => {
    try {
        const { subcategoryID } = req.params;
        const { name, description } = req.body;
        const updatedSubCategory = await subCategory_repository_1.default.updateSubCategoryByIDDB(subcategoryID, {
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
    }
    catch (error) {
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
exports.updateSubCategoryDetailsByID = updateSubCategoryDetailsByID;
const removeSubCategoryByID = async ({ req }) => {
    try {
        const { subcategoryID } = req.params; // because your schema has it in body
        const deletedSubCategory = await subCategory_repository_1.default.removeSubCategoryByIDDB(subcategoryID);
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
    }
    catch (error) {
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
exports.removeSubCategoryByID = removeSubCategoryByID;
exports.subCategoryMutationHandler = {
    createSubCategory: exports.createSubCategory,
    updateSubCategoryDetailsByID: exports.updateSubCategoryDetailsByID,
    removeSubCategoryByID: exports.removeSubCategoryByID,
};
