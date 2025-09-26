"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplate = void 0;
const EmailTemplate = (subject = "Mail From NavYantra", message = "You have used 90% of your trial credits") => `
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          text-align: center;
        }
        .logo {
    
          margin-bottom: 20px;
        }
        .logo img {
          width: 120px;
        }
        .highlight {
          font-weight: bold;
          color: #0A2540;
        }
        p{
          text-align:left;
          padding:2px;
        }
        .btn {
          display: inline-block;
          background: #6C63FF;
          color: #ffffff !important;
          padding: 12px 24px;
          margin-top: 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #888888;
        }
        a {
          color: #6C63FF;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://navyan-tech-hazel.vercel.app/logo.png" alt="NavYantra Logo" />
        </div>
        <h2>${subject}</h2>
        <p>Hi there,</p>
        <p>${message}</p>
        <p>If you have any questions, please reach out to us on our <a href="https://navyan-tech-hazel.vercel.app/contact">Support</a>.</p>
        <div class="footer">
          Regards,<br>
          Your friends at NavYantra<br><br>
          <a href="https://navyan-tech-hazel.vercel.app/">Visit us for further concern</a><br>
          © 2025 NavYantra. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;
exports.EmailTemplate = EmailTemplate;
