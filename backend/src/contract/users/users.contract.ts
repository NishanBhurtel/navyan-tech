import { initContract } from "@ts-rest/core";

import z from "zod";
import { errorSchema, successSchema } from "../common.schema";
import { getAllUsersSchema, getUserByIDSchema, removeUserByID, updateUserByIDSchema } from "./users.schema";


const c = initContract();

export const usersContract = c.router({
    getAllUsers: {
    method: "GET",
    path: "/users",
    summary: "get all users details",
    responses: {
      200: getAllUsersSchema,
      500: errorSchema,
      404: errorSchema,
    },
  },
  getUserDetailsByID: {
    method: "GET",
    path: "/users/details/:userID",
    pathParams: z.object({
      UsersID: z.string().min(1, "Users ID is required"),
    }),
    summary: "get users details",
    responses: {
      200: getUserByIDSchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
  updateUserDetails: {
    method: "PUT",
    path: "/users/updateUsersDetails/:userID",
    pathParams: z.object({
      UsersID: z.string().min(1, "User ID is required"),
    }),
    body: updateUserByIDSchema,
    summary: "Update user details",
    responses: {
      200: successSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  removeUser: {
    method: "DELETE",
    path: "/users/:userID",
    body: removeUserByID,
    summary: "Delete a User",
    responses: {
      200: successSchema,
      404: errorSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },
});
