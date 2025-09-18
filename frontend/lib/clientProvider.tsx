"use client";
import { ReactNode } from "react";

type ClientProvidersProps = {
  children: ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <>{children}</>;
}
