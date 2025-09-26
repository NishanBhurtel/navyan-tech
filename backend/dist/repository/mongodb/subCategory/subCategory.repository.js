"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategory_model_1 = __importDefault(require("../../../models/subCategory.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createSubCategoryDB = async (data) => {
    console.log(data.description);
    const subCategory = new subCategory_model_1.default({
        name: data.name,
        description: data.description,
        parentCategoryId: new mongoose_1.default.Types.ObjectId(data.parentCategoryId),
    });
    await subCategory.save();
    return subCategory;
};
const updateSubCategoryByIDDB = async (subcategoryID, data) => {
    const objectId = new mongoose_1.default.Types.ObjectId(subcategoryID);
    const updatedSubCategory = await subCategory_model_1.default.findByIdAndUpdate(objectId, { name: data.name, description: data.description }, { new: true });
    return updatedSubCategory;
};
const getAllSubCategoriesDB = async () => {
    const subCategories = await subCategory_model_1.default.find({});
    return subCategories;
};
const getSubCategoriesByParentCategoryID = async (subcategoryID) => {
    const subCategories = await subCategory_model_1.default.find({
        parentCategoryId: new mongoose_1.default.Types.ObjectId(subcategoryID),
    });
    return subCategories;
};
const removeSubCategoryByIDDB = async (subcategoryID) => {
    const objectId = new mongoose_1.default.Types.ObjectId(subcategoryID);
    const deletedSubCategory = await subCategory_model_1.default.findByIdAndDelete(objectId);
    return deletedSubCategory;
};
const subCategoryRepository = {
    getSubCategoriesByParentCategoryID,
    createSubCategoryDB,
    updateSubCategoryByIDDB,
    getAllSubCategoriesDB,
    removeSubCategoryByIDDB,
};
exports.default = subCategoryRepository;
