import { ContactFormData } from "../../contract/contact/contact.contract";

const ContactTemplate = (formData: ContactFormData): string => {
  return `
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
            <div class="value">${formData.firstName} ${formData.lastName}</div>
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
};

export default ContactTemplate;
