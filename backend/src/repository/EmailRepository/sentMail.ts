import transporter from "../../config/nodemailer";
import UserModel from "../../models/user.model";

export class SentMail {
  // send to specific emails
  async sendMail({
    from,
    to,
    subject,
    text,
    html,
  }: // attachments,
  {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    // attachments?: { filename: string; path: string }[];
  }) {
    try {
      const info = await transporter.sendMail({
        from: from || process.env.SMTP_USER,
        to: Array.isArray(to) ? to.join(", ") : to,
        subject,
        text,
        html,
        // attachments,
      });

      console.log("✅ Email sent:", info.messageId);
      return info;
    } catch (err) {
      console.error("❌ Error sending email:", err);
      throw err;
    }
  }

  // send to all users in DB
  async sendMailToAllUsers({
    from,
    subject,
    text,
    html,
  }: // attachments,
  {
    from?: string;
    subject: string;
    text?: string;
    html?: string;
    // attachments?: { filename: string; path: string }[];
  }) {
    try {
      // fetch all users from DB
      const users = await UserModel.find({}, "email"); // only select email field
      if (!users.length) {
        throw new Error("No users found in database");
      }

      const emails = users.map((user) => user.email);
      const info = await transporter.sendMail({
        from: from || process.env.SMTP_USER,
        to: emails.join(", "),
        subject,
        text,
        html,
        // attachments,
      });

      console.log(`✅ Email sent to ${emails.length} users`);
      return info;
    } catch (err) {
      console.error("❌ Error sending bulk email:", err);
      throw err;
    }
  }
}
