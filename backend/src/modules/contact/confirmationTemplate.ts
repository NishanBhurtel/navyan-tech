// mutations/contact/confirmationTemplate.ts

import { TContactFormDataSchema } from "../../contract/contact/contact.schema";

const ConfirmationTemplate = (formData: TContactFormDataSchema): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container { 
          max-width: 500px; 
          margin: 20px auto; 
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background-color: #2d5a27; 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
        }
        .content { 
          padding: 30px 20px; 
        }
        .content p {
          margin-bottom: 15px;
        }
        .footer { 
          background-color: #f8f8f8;
          text-align: center; 
          padding: 20px; 
          font-size: 12px; 
          color: #666; 
          border-top: 1px solid #e0e0e0;
        }
        .highlight {
          color: #2d5a27;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✅ Message Received!</h2>
        </div>
        <div class="content">
          <p>Hi <strong>${formData.firstName}</strong>,</p>
          
          <p>Thank you for contacting us! We've successfully received your message regarding <span class="highlight">"${formData.subject}"</span>.</p>
          
          <p>Our team will review your inquiry and get back to you within <strong>24 hours</strong> at <span class="highlight">${formData.email}</span>.</p>
          
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
};

export default ConfirmationTemplate;
