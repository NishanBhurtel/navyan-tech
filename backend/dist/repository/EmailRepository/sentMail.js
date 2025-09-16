"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentMail = void 0;
const nodemailer_1 = __importDefault(require("../../config/nodemailer"));
const user_model_1 = __importDefault(require("../../models/user.model"));
class SentMail {
    // send to specific emails
    async sendMail({ from, to, subject, text, html, }) {
        try {
            const info = await nodemailer_1.default.sendMail({
                from: from || process.env.SMTP_USER,
                to: Array.isArray(to) ? to.join(", ") : to,
                subject,
                text,
                html,
                // attachments,
            });
            console.log("✅ Email sent:", info.messageId);
            return info;
        }
        catch (err) {
            console.error("❌ Error sending email:", err);
            throw err;
        }
    }
    // send to all users in DB
    async sendMailToAllUsers({ from, subject, text, html, }) {
        try {
            // fetch all users from DB
            const users = await user_model_1.default.find({}, "email"); // only select email field
            if (!users.length) {
                throw new Error("No users found in database");
            }
            const emails = users.map((user) => user.email);
            const info = await nodemailer_1.default.sendMail({
                from: from || process.env.SMTP_USER,
                to: emails.join(", "),
                subject,
                text,
                html,
                // attachments,
            });
            console.log(`✅ Email sent to ${emails.length} users`);
            return info;
        }
        catch (err) {
            console.error("❌ Error sending bulk email:", err);
            throw err;
        }
    }
}
exports.SentMail = SentMail;
