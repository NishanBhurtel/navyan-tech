import { initContract } from "@ts-rest/core";
import { errorSchema } from "../common.schema";
import { createContactSchema, contactSuccessSchema } from "./contact.schema";

const c = initContract();

export const contactContract = c.router({
  createContact: {
    method: "POST",
    path: "/api/contact",
    body: createContactSchema,
    summary: "Create a contact ",
    responses: {
      200: contactSuccessSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
});

