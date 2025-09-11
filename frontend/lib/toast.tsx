// components/ToastMessage.tsx
"use client";

import * as Toast from "@radix-ui/react-toast";
import { createContext, ReactNode, useContext, useState } from "react";

type ToastContextType = {
  showToast: (message: string, bgColor?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("bg-green-600");

  const showToast = (msg: string, color = "bg-green-600") => {
    setMessage(msg);
    setBgColor(color);
    setOpen(false); // close any previous toast
    setTimeout(() => setOpen(true), 10); // open new toast
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          className={`z-[9999] fixed top-4 right-4 px-4 py-2 rounded-[4px] shadow-lg text-white ${bgColor}`}
          open={open}
          onOpenChange={setOpen}
          duration={3000} 
        >
          <Toast.Title>{message}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col gap-2 p-4 z-[9999]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
