"use client";

import { useAllUsers } from "@/hooks/users/getAllUser";

export default function OurImpact() {
  const { data: users } = useAllUsers();

  // Get the real number of customers
  const customerCount = users
    ? users.filter((user) => user.role === "customer").length
    : 0;

  const displayCount = customerCount > 100 ? customerCount : 120;

  // Dynamic Years of Service
  const foundingYear = 2017;
  const currentYear = new Date().getFullYear();
  const yearsOfService = currentYear - foundingYear;

  const stats = [
    { number: `${displayCount}+`, label: "Citizens Served" },
    { number: `${yearsOfService}+`, label: "Years of Service" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-lg text-white">
            Numbers that show our commitment towards our users
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
