// services/contact.service.ts
import { ContactFormData } from "../../contract/contact/contact.contract";
import { SentMail } from "./sentMail";
import { v4 as uuidv4 } from "uuid";

export class ContactService {
  private emailService: SentMail;

  constructor() {
    this.emailService = new SentMail();
  }

  async submitContactForm(
    formData: ContactFormData
  ): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      // Generate unique ID for tracking
      const submissionId = uuidv4();

      // Generate email template
      const emailTemplate = this.generateEmailTemplate(formData);

      // Send email to admin using your existing SentMail service
      await this.emailService.sendMail({
        to: process.env.ADMIN_EMAIL!,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      });

      // Optional: Send confirmation email to user
      if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
        await this.sendConfirmationEmail(formData);
      }

      console.log(
        `✅ Contact form submitted successfully - ID: ${submissionId}`
      );

      return {
        success: true,
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
        id: submissionId,
      };
    } catch (error) {
      console.error("❌ Error processing contact form:", error);
      return {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      };
    }
  }

  private generateEmailTemplate(formData: ContactFormData): {
    subject: string;
    html: string;
    text: string;
  } {
    const subject = `🔔 New Contact Form: ${formData.subject} - ${formData.firstName} ${formData.lastName}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 30px 20px;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
            border-left: 4px solid #2d5a27;
          }
          .label {
            font-weight: 600;
            color: #2d5a27;
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #333;
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-box {
            background-color: white;
            border: 2px solid #e0e0e0;
            padding: 20px;
            border-radius: 8px;
            font-style: italic;
            line-height: 1.8;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
          }
          .footer p {
            margin: 5px 0;
            font-size: 12px;
            color: #666;
          }
          .reply-info {
            background-color: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
          }
          .reply-info strong {
            color: #2d5a27;
          }
          .priority-badge {
            display: inline-block;
            background-color: #ff6b6b;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 10px;
          }
          .newsletter-badge {
            display: inline-block;
            background-color: #4ecdc4;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">👤 Full Name</span>
              <div class="value">${formData.firstName} ${
      formData.lastName
    }</div>
            </div>
            
            <div class="field">
              <span class="label">✉️ Email Address</span>
              <div class="value">
                <a href="mailto:${
                  formData.email
                }" style="color: #2d5a27; text-decoration: none;">
                  ${formData.email}
                </a>
              </div>
            </div>
            
            ${
              formData.phoneNumber
                ? `
            <div class="field">
              <span class="label">📱 Phone Number</span>
              <div class="value">
                <a href="tel:${formData.phoneNumber}" style="color: #2d5a27; text-decoration: none;">
                  ${formData.phoneNumber}
                </a>
              </div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <span class="label">🏷️ Subject Category</span>
              <div class="value">
                ${formData.subject}
                ${
                  [
                    "Technical Support",
                    "Order Status",
                    "Warranty Claim",
                  ].includes(formData.subject)
                    ? '<span class="priority-badge">HIGH PRIORITY</span>'
                    : ""
                }
              </div>
            </div>
            
            <div class="field">
              <span class="label">📰 Newsletter Subscription</span>
              <div class="value">
                ${
                  formData.subscribeToNewsLatter
                    ? '<span class="newsletter-badge">✅ SUBSCRIBED</span>'
                    : "❌ Not Subscribed"
                }
              </div>
            </div>
            
            <div class="field">
              <span class="label">💬 Message</span>
              <div class="message-box">
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div class="reply-info">
              <strong>💡 Quick Reply:</strong> Simply reply to this email to respond directly to ${
                formData.firstName
              }
            </div>
          </div>
          
          <div class="footer">
            <p><strong>📅 Submitted:</strong> ${new Date().toLocaleString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              }
            )}</p>
            <p>This message was sent via the website contact form</p>
            <p style="color: #2d5a27;"><strong>⏰ Response Time Goal: Within 24 hours</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
🔔 NEW CONTACT FORM SUBMISSION
=====================================

👤 Name: ${formData.firstName} ${formData.lastName}
✉️  Email: ${formData.email}
${formData.phoneNumber ? `📱 Phone: ${formData.phoneNumber}` : ""}
🏷️  Subject: ${formData.subject}
📰 Newsletter: ${formData.subscribeToNewsLatter ? "Yes" : "No"}

💬 MESSAGE:
${formData.message}

=====================================
📅 Submitted: ${new Date().toLocaleString()}
⏰ Response Goal: Within 24 hours

💡 Reply directly to this email to respond to ${formData.firstName}
    `;

    return { subject, html, text };
  }

  private async sendConfirmationEmail(
    formData: ContactFormData
  ): Promise<void> {
    try {
      const confirmationHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2d5a27; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Message Received!</h2>
            </div>
            <div class="content">
              <p>Hi <strong>${formData.firstName}</strong>,</p>
              
              <p>Thank you for contacting us! We've successfully received your message regarding <strong>"${formData.subject}"</strong>.</p>
              
              <p>Our team will review your inquiry and get back to you within 24 hours at <strong>${formData.email}</strong>.</p>
              
              <p>If you have any urgent concerns, please don't hesitate to call our support line.</p>
              
              <p>Best regards,<br>
              <strong>Support Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await this.emailService.sendMail({
        to: formData.email,
        subject: "✅ Contact Form Confirmation - We received your message!",
        html: confirmationHtml,
        text: `Hi ${formData.firstName}, thank you for contacting us! We've received your message about "${formData.subject}" and will get back to you within 24 hours.`,
      });

      console.log(`✅ Confirmation email sent to ${formData.email}`);
    } catch (error) {
      console.error("❌ Failed to send confirmation email:", error);
      // Don't throw error here, as the main contact form was successful
    }
  }
}
