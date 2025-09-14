"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMutationHandler = void 0;
const sentMail_1 = require("../../repository/EmailRepository/sentMail");
const emailTemplate_1 = __importDefault(require("./emailTemplate"));
const emailService = new sentMail_1.SentMail();
const sentMailMutation = async ({ req }) => {
    try {
        const { subject, text } = req.body;
        await emailService.sendMailToAllUsers({
            subject,
            text: text,
            // html: `<p>${text}  </p>`,
            html: (0, emailTemplate_1.default)(),
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Emails sent successfully",
            },
        };
    }
    catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                error: "Error Sending Mail",
            },
        };
    }
};
exports.emailMutationHandler = {
    sentMailMutation,
};
