"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailTemplateForSpecificUser;
// emailTemplate.ts
function EmailTemplateForSpecificUser({ username, message, }) {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello, ${username} 👋</h2>
      <p>${message}</p>
      <hr />
      <small>Powered by Your NavYantra 🚀</small>
    </div>
  `;
}
