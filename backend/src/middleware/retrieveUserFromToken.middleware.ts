import env from "../config/env";
import { authRepository } from "../repository/mongodb/auth/auth.repository";
import usersRepository from "../repository/mongodb/user/users.repository";

export const retrieveUserFromTokenMiddleware = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    // No token → skip
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    const decoded = authRepository.verifyJwtToken(token, env.JWT_SECRET) as {
      userId: string;
    };

    if (decoded?.userId) {
      const user = await usersRepository.getUserByID(decoded.userId);

      if (user) {
        req.user = {
          id: decoded.userId,
          role: user.role as "admin" | "customer",
        };
      }
    }

    next();
  } catch (err) {
    console.error("Error in retrieveUserFromTokenMiddleware:", err);
    // Invalid token → just skip user, don't block
    next();
  }
};
