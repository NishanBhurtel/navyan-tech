"use client";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useAllUsers } from "@/hooks/users/getAllUser";
export default function LoginDetails() {
  const { data: products } = useAllProducts({});

  const { data: users } = useAllUsers();
  const customerCount = users
    ? users.filter((user) => user.role === "customer").length
    : 120;

  const displayCount = customerCount > 100 ? customerCount : 120;

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome Back to NavYantra!
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Your trusted partner in cutting-edge technology. Experience premium
            computing solutions, expert guidance, and unmatched customer
            service.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{displayCount}+</div>
              <div className="opacity-80">Satisfied Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {products ? products.pagination?.total : 120}+
              </div>
              <div className="opacity-80">Tech Products</div>
            </div>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Expert technical consultation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Premium warranty & support</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Fastest delivery in the region</span>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    </div>
  );
}
