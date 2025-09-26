import React from "react";
import { Box } from "lucide-react"; // optional icon

export default function NoProduct() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Optional icon */}
        <Box className="w-12 h-12 text-gray-400" />

        {/* Main message */}
        <h2 className="text-xl font-semibold text-gray-700">
          No products available related to your search!
        </h2>

        {/* Optional link back to homepage */}
      </div>
    </div>
  );
}
