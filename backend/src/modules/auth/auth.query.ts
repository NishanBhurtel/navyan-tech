import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";

import { authContract } from "../../contract/auth/auth.contract";
import usersRepository from "../../repository/mangodb/user/users.repository";

export const getTotalNumberOfUsers: AppRouteImplementationOrOptions<
  typeof authContract.getTotalNumberOfUsers
> = async () => {
  try {
    const users = await usersRepository.countUsers();
    return {
      status: 200,
      body: { success: true, totalUsers: users },
    };
  } catch (error) {
    return {
      status: 500,
      body: { success: false, error: "Internal server error" },
    };
  }
};

const authQueryHandler = {
  getTotalNumberOfUsers,
};
export default authQueryHandler;
