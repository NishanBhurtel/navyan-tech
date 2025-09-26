import { AppRouteMutationImplementation } from "@ts-rest/express";

import { emailContract } from "../../contract/email/email.contract";

import { SentMail } from "../../repository/EmailRepository/sentMail";
import EmailTemplateForSpecificUser from "./emailTemplateForSpecificUser";
import { EmailTemplate } from "./emailTemplate";
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
      html: EmailTemplate(subject,text),
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

const sentEmailToSpecificUserMutation: AppRouteMutationImplementation<
  typeof emailContract.sendEmailToSpecificUser
> = async ({ req }) => {
  try {
    const { email, subject, text, html } = req.body;
    await emailService.sendMailToSpecificUser({

      to: email,
      subject,
      text,
      html:
        html ||
        EmailTemplateForSpecificUser({
          username: email.split("@")[0], // 👈 e.g. "customer"
          message: text,
        }),
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
  sentEmailToSpecificUserMutation,
};
