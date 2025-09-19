import { AppRouteQueryImplementation } from "@ts-rest/express";
import { usersContract } from "../../contract/users/users.contract";
import usersRepository from "../../repository/mongodb/user/users.repository";

// GET /users/details/:userID
const getUserDetailsByID: AppRouteQueryImplementation<
  typeof usersContract.getUserDetailsByID
> = async ({ req }) => {
  const { UsersID } = req.params; // matches pathParams in your contract

  if (!UsersID) {
    return {
      status: 400,
      body: { success:false, error: "User ID is required" },
    };
  }

  const user = await usersRepository.getUserByID(UsersID);

  if (!user) {
    return {
      status: 404,
      body: { 
        success: false,
        error: "User not found" },
    };
  }

  return {
    status: 200,
    body: {
      _id: user._id.toString(),
      firstName: user.userName.firstName,
      lastName: user.userName.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    },
  };
};

// GET /users
const getAllUsers: AppRouteQueryImplementation<
  typeof usersContract.getAllUsers
> = async () => {
  try {
    const users = await usersRepository.getAllUsers();

    const formattedUsers = users.map((u) => ({
      _id: u._id.toString(),
      firstName: u.userName.firstName,
      lastName: u.userName.lastName,
      email: u.email,
      phoneNumber: u.phoneNumber,
      createdAt: u.createdAt,
      role: u.role,
    }));

    return {
      status: 200,
      body: formattedUsers, // return array of users directly
    };
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return {
      status: 500,
      body: { success:false,
        error: "Failed to get all users" },
    };
  }
};

export const usersQueryHandler = {
  getUserDetailsByID,
  getAllUsers,
};
