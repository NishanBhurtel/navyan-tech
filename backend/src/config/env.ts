type TEnv = {
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
  DB_NAME: string;
};

const env: TEnv = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  MONGO_URI: process.env.MONGO_URI || "",
  DB_NAME: process.env.DB_NAME || "dev",
};

export default env;
