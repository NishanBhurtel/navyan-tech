import { initServer } from "@ts-rest/express";

import { authContract } from "../../contract/auth/auth.contract";
import { authMutationHandler } from "./auth.mutation";
import authQueryHandler from "./auth.query";

const s = initServer();

export const authRouter = s.router(authContract, {
  register: authMutationHandler.registerUser,
  login: authMutationHandler.loginUser,
  getTotalNumberOfUsers: authQueryHandler.getTotalNumberOfUsers,
});
