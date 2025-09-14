import { AppRouteMutationImplementation } from "@ts-rest/express";

import { emailContract } from "../../contract/email/email.contract";

import { SentMail } from "../../repository/EmailRepository/sentMail";
import EmailTemplate from "./emailTemplate";
const emailService = new SentMail();

const sentMailMutation: AppRouteMutationImplementation<
  typeof emailContract.sendMail
> = async ({ req }) => {
  try {
    const { subject, text } = req.body;
    await emailService.sendMailToAllUsers({
      subject,
      text: text,
      // html: `<p>${text}  </p>`,
      html: EmailTemplate(),
    });
    return {
      status: 200,
      body: {
        success: true,
        message: "Emails sent successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: "Error Sending Mail",
      },
    };
  }
};

export const emailMutationHandler = {
  sentMailMutation,
};
