import { initServer } from "@ts-rest/express";
import { contactContract } from "../../contract/contact/contact.contract";

import { contactMutationHandler } from "./contact.mutation";
const s = initServer();

export const contactRouter = s.router(contactContract, {
  createContact: contactMutationHandler.sendMessageMutation,
});
