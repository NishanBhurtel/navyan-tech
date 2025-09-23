import React from "react";
import Link from "next/link";

export default function DataLoading() {
  const dots = Array.from({ length: 8 }); // 🔄 number of dots
  const radius = 24; // distance from center
  const size = 10; // dot size

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center justify-center border border-gray-200 text-center space-y-6 p-12 rounded-[8px]">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/NavYantra-Logo.png" alt="logo" className="h-24 w-auto" />
        </Link>

        {/* 🔄 Simple Circle Spinner */}
        <div className="relative w-16 h-16 animate-spin">
          {dots.map((_, i) => {
            const angle = (i * 2 * Math.PI) / dots.length;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={i}
                className="absolute bg-black rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `calc(50% + ${y}px - ${size / 2}px)`,
                  left: `calc(50% + ${x}px - ${size / 2}px)`,
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Please wait until the data loads from our server. <br />
            <span className="text-[16px] text-yellow-600">Or</span>
          </h2>
          <p className="text-gray-600 mt-2">Please try again later.</p>
        </div>
      </div>
    </div>
  );
}
