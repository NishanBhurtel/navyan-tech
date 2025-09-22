import React from "react";
import { AlertTriangle } from "lucide-react"; // optional icon
import Link from "next/link";

export default function DataLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <div className="flex flex-col items-center justify-center border-1 border-gray-200 text-center space-y-6 p-12 rounded-[8px]">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/NavYantra-Logo.png" alt="logo" className="h-24 w-auto" />
        </Link>
        <div className="flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">
            Please wait until the data
            loads from our server. <br /> <span className="text-[16px] text-yellow-600">Or</span>
          </h2>
          <p className="text-gray-600 mt-2">Please try again later.</p>
        </div>
      </div>
    </div>
  );
}
