"use client";
import { ReactNode } from "react";
import { ToastProvider } from "./Toast"; // named import

type ClientProvidersProps = {
  children: ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
