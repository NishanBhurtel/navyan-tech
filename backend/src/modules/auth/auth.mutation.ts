import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import userRepository from "../../repository/mongodb/user/users.repository";
import bcrypt from "bcryptjs";
import { authRepository } from "../../repository/mongodb/auth/auth.repository";
import env from "../../config/env";

export const registerUser: AppRouteMutationImplementation<
  typeof authContract.register
> = async ({ req }) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const existingUsers = await userRepository.getAllUsers({
      email: email.toLowerCase(),
    });
    if (existingUsers.length > 0) {
      return {
        status: 400,
        body: { success: false, error: "Email already in use" },
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await userRepository.save({
      userName: { firstName, lastName },
      email: email.toLowerCase(),
      password: passwordHash,
      phoneNumber,
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "User registered successfully",
        userId: newUser._id.toString(),
      },
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      status: 500,
      body: { success: false, error: "Internal server error" },
    };
  }
};

export const loginUser: AppRouteMutationImplementation<
  typeof authContract.login
> = async ({ req, res }) => {
  try {
    const { email, password } = req.body;

    const users = await userRepository.getAllUsers({
      email: email.toLowerCase(),
    });

    if (users.length === 0) {
      return { status: 404, body: { success: false, error: "User not found" } };
    }

    const user = users[0];
    console.log(password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: 401,
        body: { success: false, error: "Invalid credentials" },
      };
    }

    const userId = user._id.toString();

    const token = authRepository.createJwtToken({ userId }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      status: 200,
      body: {
        success: true,
        message: "User logged in successfully",
        id: userId,
        email: user.email,
        firstName: user.userName.firstName,
        lastName: user.userName.lastName,
        role: user.role,
        token,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: 500,
      body: { success: false, error: "Internal server error" },
    };
  }
};

export const authMutationHandler = {
  registerUser,
  loginUser,
};
