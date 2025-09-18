import { initContract } from "@ts-rest/core";

import { errorSchema, successSchema } from "../common.schema";
import { emailSchema, emailSchemaToSpecificUser } from "./email.schema";

const c = initContract();

export const emailContract = c.router({
  sendMail: {
    method: "POST",
    path: "/email/send",
    body: emailSchema,
    summary: "send an email",
    responses: {
      200: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
  sendEmailToSpecificUser: {
    method: "POST",
    path: "/email/sent",
    summary: "sent email to specific user",
    body: emailSchemaToSpecificUser,
    responses: {
      200: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
