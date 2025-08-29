import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "yourAccessTokenSecret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "yourRefreshTokenSecret";

interface TokenPayload {
  userId: string;
}

export const generateAccessAndRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const payload: TokenPayload = { userId };

  // Access token valid for 1 hour
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  // Refresh token valid for 7 days
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
