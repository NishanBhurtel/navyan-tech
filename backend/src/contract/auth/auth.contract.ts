import { initContract } from "@ts-rest/core";

import {
  loginSchema,
  registerSchema,
  getProfileSchema,
  loginResponseSchema,
  updateUserDetailsSchema,
} from "./auth.schema";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const authContract = c.router({
  // getProfile: {
  //   method: "GET",
  //   path: "/auth/me",
  //   summary: "get user profile",
  //   responses: {
  //     200: getProfileSchema,
  //     400: errorSchema,
  //     404: errorSchema,
  //     500: errorSchema,
  //   },
  // },
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
  // updateUserDetails: {
  //   method: "PUT",
  //   path: "/auth/updateUserDetails",
  //   body: updateUserDetailsSchema,
  //   summary: "Update user personal details",
  //   responses: {
  //     200: successSchema,
  //     400: errorSchema,
  //     401: errorSchema,
  //     404: errorSchema,
  //     500: errorSchema,
  //   },
  // },
});
