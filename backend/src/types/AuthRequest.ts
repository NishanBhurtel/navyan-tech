// /types/AuthRequest.ts
import { TsRestRequest } from "@ts-rest/express";

export type TsRestAuthRequest<T extends Record<string, any> = any> =
  TsRestRequest<T> & {
    user?: {
      id: string;
      role?: "customer" | "admin";
    };
  };
