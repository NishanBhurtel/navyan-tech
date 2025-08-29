import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./modules";
import { contract } from "./contract";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./libs/swagger";
import { createExpressEndpoints } from "@ts-rest/express";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

createExpressEndpoints(contract, router, app);
export default app;
