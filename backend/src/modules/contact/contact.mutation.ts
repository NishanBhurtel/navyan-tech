import { AppRouteMutationImplementation } from "@ts-rest/express";
import {
  contactContract,
} from "../../contract/contact/contact.contract";
import { SentMail } from "../../repository/EmailRepository/sentMail";
import ContactTemplate from "./contact.template";
import ConfirmationTemplate from "./confirmationTemplate";
import { v4 as uuidv4 } from "uuid";
import { TContactFormDataSchema } from "../../contract/contact/contact.schema";

const emailService = new SentMail();

const sendMessageMutation: AppRouteMutationImplementation<
  typeof contactContract.createContact
> = async ({ req }) => {
  try {
    const formData: TContactFormDataSchema = req.body;
    const submissionId = uuidv4();

    // Validate required fields
    if (
      !formData.firstName?.trim() ||
      !formData.lastName?.trim() ||
      !formData.email?.trim() ||
      !formData.message?.trim()
    ) {
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
      to: process.env.ADMIN_EMAIL!,
      subject: emailSubject,
      text: emailText,
      html: ContactTemplate(formData),
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    });

    // Send confirmation email to user (if enabled)
    if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
      try {
        await emailService.sendMail({
          to: formData.email,
          subject: "✅ Contact Form Confirmation - We received your message!",
          html: ConfirmationTemplate(formData),
          text: `Hi ${formData.firstName}, thank you for contacting us! We've received your message about "${formData.subject}" and will get back to you within 24 hours.`,
        });
        console.log(`✅ Confirmation email sent to ${formData.email}`);
      } catch (confirmError) {
        console.error("❌ Failed to send confirmation email:", confirmError);
      }
    }

    console.log(`✅ Contact form submitted successfully - ID: ${submissionId}`);

    return {
      status: 200,
      body: {
        success: true,
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
        id: submissionId,
      },
    };
  } catch (error) {
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

export const contactMutationHandler = {
  sendMessageMutation,
};
