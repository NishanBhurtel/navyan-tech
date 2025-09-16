"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSubCategorySchema = exports.updateSubCategoryDetailsSchema = exports.getAllSubCategorySchema = exports.createSubCategorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createSubCategorySchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    parentCategoryId: zod_1.default.string(),
});
exports.getAllSubCategorySchema = zod_1.default.array(zod_1.default.object({
    _id: zod_1.default.string(),
    parentCategoryId: zod_1.default.string(),
    name: zod_1.default.string(),
    description: zod_1.default.string(),
}));
exports.updateSubCategoryDetailsSchema = zod_1.default.object({
    _id: zod_1.default.string(),
    name: zod_1.default.string(),
    description: zod_1.default.string(),
});
exports.removeSubCategorySchema = zod_1.default.object({
    subcategoryID: zod_1.default.string(),
});
