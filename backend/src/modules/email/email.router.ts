import { initServer } from "@ts-rest/express";

import { emailContract } from "../../contract/email/email.contract";

import { emailMutationHandler } from "./email.mutation";

const s = initServer();

export const emailRouter = s.router(emailContract, {
  sendMail: emailMutationHandler.sentMailMutation,
  sendEmailToSpecificUser: emailMutationHandler.sentEmailToSpecificUserMutation,
});
