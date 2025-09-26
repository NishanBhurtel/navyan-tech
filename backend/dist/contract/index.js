"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
// contracts/comment.contract.ts
const core_1 = require("@ts-rest/core");
const auth_contract_1 = require("./auth/auth.contract");
const product_contract_1 = require("./products/product.contract");
const subcategory_contract_1 = require("./subcategories/subcategory.contract");
const category_contract_1 = require("./categories/category.contract");
const users_contract_1 = require("./users/users.contract");
const email_contract_1 = require("./email/email.contract");
const order_contract_1 = require("./order/order.contract");
const contact_contract_1 = require("./contact/contact.contract");
const c = (0, core_1.initContract)();
exports.contract = c.router({
    auth: auth_contract_1.authContract,
    user: users_contract_1.usersContract,
    product: product_contract_1.productContract,
    category: category_contract_1.categoryContract,
    subCategory: subcategory_contract_1.subCategoryContract,
    email: email_contract_1.emailContract,
    order: order_contract_1.orderContract,
    contact: contact_contract_1.contactContract,
});
