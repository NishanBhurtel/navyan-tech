import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <div className="flex flex-col items-center justify-center border-1 border-gray-200 text-center space-y-6 p-12 rounded-[8px]">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="h-24 w-auto" />
        </Link>
        <div className="flex flex-col items-center justify-center space-y-2 ">
          <XCircle className="w-12 h-12 text-red-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Somthing went wrong in our end
          </h2>
          <p className="text-gray-600 mt-2">
            We couldn't load the requested data. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
