"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategoryByID = exports.getAllCategories = void 0;
exports.createCategory = createCategory;
exports.updateCategoryByID = updateCategoryByID;
const category_model_1 = __importDefault(require("../../../models/category.model"));
// Create a category
async function createCategory(data) {
    try {
        const category = new category_model_1.default(data);
        const savedCategory = await category.save();
        return savedCategory;
    }
    catch (error) {
        throw new Error("Failed to create category: " + error.message);
    }
}
// get all category
const getAllCategories = async () => {
    return await category_model_1.default.find({});
};
exports.getAllCategories = getAllCategories;
// Update a category by ID
async function updateCategoryByID({ _id, name, description, }) {
    const updatedCategory = await category_model_1.default.findByIdAndUpdate(_id, { name, description }, { new: true } // returns the updated document
    );
    return updatedCategory;
}
const removeCategoryByID = async (categoryID) => {
    return await category_model_1.default.findByIdAndDelete(categoryID);
};
exports.removeCategoryByID = removeCategoryByID;
