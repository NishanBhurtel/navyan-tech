"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.emailSchema = zod_1.default.object({
    subject: zod_1.default.string(),
    text: zod_1.default.string(),
});
