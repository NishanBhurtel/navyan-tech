type TEnv ={
    PORT: number;
    JWT_SECRET: string;
}


const env: TEnv = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
};

export default env;