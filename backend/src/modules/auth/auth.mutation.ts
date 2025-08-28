import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import userRepository from "../../repository/mangodb/user/users.repository";
import bcrypt from "bcryptjs";
import { generateAccessAndRefreshToken } from "../../libs/token.utils";

export const registerUser: AppRouteMutationImplementation<
  typeof authContract.register
> = async ({ req }) => {
  try {
    const { firstName, lastName, role, email, password, phoneNumber } =
      req.body;

    const existingUsers = await userRepository.get({
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
      role,
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

    const users = await userRepository.get({ email: email.toLowerCase() });
    if (users.length === 0) {
      return { status: 404, body: { success: false, error: "User not found" } };
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        body: { success: false, error: "Invalid credentials" },
      };
    }

    const userId = user._id.toString();
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      userId
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return {
      status: 200,
      body: {
        success: true,
        message: "User logged in successfully",
        uid: userId,
        _id: userId,
        email: user.email,
        firstName: user.userName.firstName,
        lastName: user.userName.lastName,
        role: user.role as "admin" | "customer",
        accessToken,
        refreshToken,
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
