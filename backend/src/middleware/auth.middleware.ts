import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repository/mangodb/user/users.repository";

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "your_secret_key"; // replace with env variable
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // attach user info to request
    req.user = { id: decoded.userId };

    // optionally, you can verify user exists in DB
    const user = await UserRepository.getByID(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
