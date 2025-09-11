import { AppRouteMutationImplementation } from "@ts-rest/express";
import { usersContract } from "../../contract/users/users.contract";
import usersRepository from "../../repository/mangodb/user/users.repository";

export const updateUserDetails: AppRouteMutationImplementation<
  typeof usersContract.updateUserDetails
> = async ({ req, res }) => {
  try {
    const {
      userName:{
        firstName,
        lastName,
      },
      email,
      phoneNumber
    } = req.body;

    const newProduct = await usersRepository.save({
      userName:{
        firstName: firstName,
        lastName: lastName,
      },
     email:email,
     phoneNumber: phoneNumber,
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "User updated successfully",
        data: newProduct,
      },
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to update user",
        error: (error as Error).message,
      },
    };
  }
};

export const removeUser: AppRouteMutationImplementation<
  typeof usersContract.removeUser
> = async ({ req }) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return {
        status: 400,
        body: { success: false, error: "User ID is required" },
      };
    }

    const deletedUser = await usersRepository.deleteUser(userID);

    if (!deletedUser) {
      return {
        status: 404,
        body: { success: false, error: "User not found" },
      };
    }

    return {
      status: 200,
      body: { success: true, message: "User deleted successfully" },
    };
  } catch (error) {
    return {
      status: 500,
      body: { success: false, error: (error as Error).message },
    };
  }
};


export const userMutationHandler = {
  updateUserDetails,
  removeUser,
};
