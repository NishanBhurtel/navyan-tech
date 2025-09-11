import { initServer } from "@ts-rest/express";
import { usersContract } from "../../contract/users/users.contract";
import { userMutationHandler } from "./user.mutation";
import { usersQueryHandler } from "./user.query";


const s = initServer();

export const userRouter = s.router(usersContract, {
  updateUserDetails: userMutationHandler.updateUserDetails,
  removeUser: userMutationHandler.removeUser,
  getAllUsers: usersQueryHandler.getAllUsers,
  getUserDetailsByID: usersQueryHandler.getUserDetailsByID,
});
