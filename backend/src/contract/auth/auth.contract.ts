import { initContract } from "@ts-rest/core";

import {
  loginSchema,
  registerSchema,
  loginResponseSchema,
} from "./auth.schema";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const authContract = c.router({
  register: {
    method: "POST",
    path: "/auth/register",
    body: registerSchema,
    summary: "create a user",
    responses: {
      201: successSchema.extend({
        userId: z.string(),
      }),
      400: errorSchema,
      500: errorSchema,
    },
  },

  login: {
    method: "POST",
    path: "/auth/login",
    body: loginSchema,
    summary: "login user",
    responses: {
      200: loginResponseSchema,
      404: errorSchema,
      401: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
