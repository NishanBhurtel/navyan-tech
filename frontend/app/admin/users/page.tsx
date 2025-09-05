"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../types";
import { Button } from "@/components/user-components/ui/button";
import { Download, Mail } from "lucide-react";
import UserFilters from "@/components/admin-components/user/filter";
import UsersTable from "@/components/admin-components/user/table";
import { userApi } from "@/lib/api/users.api";


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await userApi.getAllusersApi();
      
      const normalized = Array.isArray(data) ? data : data.users || [];
      
      setUsers(normalized);
    } catch (err: any) {
      console.error(err.message || "Failed to load users");
    } finally {
      console.log("Users fetched");
    }
  };

  fetchUsers();
}, []);

console.log(users);



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            <Link href="/admin/email">Send Email</Link>
          </Button>
        </div>
      </div>

      <UserFilters

        searchTerm={""}

        setSearchTerm={()=>{}}
      />

      <UsersTable
        users={users}
      />
    </div>
  );
}
