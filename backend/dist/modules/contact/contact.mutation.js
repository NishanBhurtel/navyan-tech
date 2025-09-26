"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMutationHandler = void 0;
const sentMail_1 = require("../../repository/EmailRepository/sentMail");
const contact_template_1 = __importDefault(require("./contact.template"));
const confirmationTemplate_1 = __importDefault(require("./confirmationTemplate"));
const uuid_1 = require("uuid");
const emailService = new sentMail_1.SentMail();
const sendMessageMutation = async ({ req }) => {
    try {
        const formData = req.body;
        const submissionId = (0, uuid_1.v4)();
        // Validate required fields
        if (!formData.firstName?.trim() ||
            !formData.lastName?.trim() ||
            !formData.email?.trim() ||
            !formData.message?.trim()) {
            return {
                status: 400,
                body: {
                    success: false,
                    message: "Missing required fields",
                    errors: [
                        { field: "general", message: "Please fill in all required fields" },
                    ],
                },
            };
        }
        // Generate email subject and text for plain text version
        const emailSubject = `🔔 New Contact Form: ${formData.subject} - ${formData.firstName} ${formData.lastName}`;
        const emailText = `
🔔 NEW CONTACT FORM SUBMISSION
=====================================

👤 Name: ${formData.firstName} ${formData.lastName}
✉️  Email: ${formData.email}
${formData.phone ? `📱 Phone: ${formData.phone}` : ""}
🏷️  Subject: ${formData.subject}
📰 Newsletter: ${formData.subscribeToNewsLatter ? "Yes" : "No"}

💬 MESSAGE:
${formData.message}

=====================================
📅 Submitted: ${new Date().toLocaleString()}
⏰ Response Goal: Within 24 hours

💡 Reply directly to this email to respond to ${formData.firstName}
    `;
        // Send email to admin
        await emailService.sendMail({
            to: process.env.ADMIN_EMAIL,
            subject: emailSubject,
            text: emailText,
            html: (0, contact_template_1.default)(formData),
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        });
        // Send confirmation email to user (if enabled)
        if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
            try {
                await emailService.sendMail({
                    to: formData.email,
                    subject: "✅ Contact Form Confirmation - We received your message!",
                    html: (0, confirmationTemplate_1.default)(formData),
                    text: `Hi ${formData.firstName}, thank you for contacting us! We've received your message about "${formData.subject}" and will get back to you within 24 hours.`,
                });
                console.log(`✅ Confirmation email sent to ${formData.email}`);
            }
            catch (confirmError) {
                console.error("❌ Failed to send confirmation email:", confirmError);
            }
        }
        console.log(`✅ Contact form submitted successfully - ID: ${submissionId}`);
        return {
            status: 200,
            body: {
                success: true,
                message: "Message sent successfully! We'll get back to you within 24 hours.",
                id: submissionId,
            },
        };
    }
    catch (error) {
        console.error("❌ Error processing contact form:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Error sending message. Please try again later.",
            },
        };
    }
};
exports.contactMutationHandler = {
    sendMessageMutation,
};
