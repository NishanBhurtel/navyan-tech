"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("@ts-rest/express");
const contract_1 = require("../contract");
const auth_router_1 = require("./auth/auth.router");
const product_router_1 = require("./product/product.router");
const subCategory_router_1 = require("../modules/subCategory/subCategory.router");
const category_router_1 = require("./category/category.router");
const user_router_1 = require("./users/user.router");
const email_router_1 = require("./email/email.router");
const order_router_1 = require("./order/order.router");
const contact_router_1 = require("./contact/contact.router");
const s = (0, express_1.initServer)();
exports.router = s.router(contract_1.contract, {
    user: user_router_1.userRouter,
    auth: auth_router_1.authRouter,
    product: product_router_1.productRouter,
    subCategory: subCategory_router_1.subCategoryRouter,
    category: category_router_1.categoryRouter,
    email: email_router_1.emailRouter,
    order: order_router_1.orderRouter,
    contact: contact_router_1.contactRouter,
});
