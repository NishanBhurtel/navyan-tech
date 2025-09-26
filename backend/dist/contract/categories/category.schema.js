"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategorySchema = exports.updateCategoryDetailsSchema = exports.getAllCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCategorySchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Categoroy is required!"),
    description: zod_1.default.string().min(1, "Description is required!"),
});
exports.getAllCategorySchema = zod_1.default.array(zod_1.default.object({
    _id: zod_1.default.string(),
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    totalItems: zod_1.default.number(),
    subCategories: zod_1.default.array(zod_1.default.object({
        _id: zod_1.default.string(),
        name: zod_1.default.string(),
        description: zod_1.default.string(),
        parentCategoryId: zod_1.default.string(),
    })),
}));
exports.updateCategoryDetailsSchema = zod_1.default.object({
    _id: zod_1.default.string(),
    name: zod_1.default.string().min(1, "Categoroy is required!"),
    description: zod_1.default.string().min(1, "Description is required!"),
});
exports.removeCategorySchema = zod_1.default.object({});
