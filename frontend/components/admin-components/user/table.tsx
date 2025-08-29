import { Badge } from "@/components/user-components/ui/badge"
import { Button } from "@/components/user-components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/user-components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/user-components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Ban, UserCheck, Mail } from "lucide-react"
import { UsersTableProps } from "@/app/admin/types"

export default function UsersTable({
  users,
  handleUserAction,
  handleStatusChange,
  getRoleColor,
  getStatusColor,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full bg-gray-100" />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="text-sm text-gray-900">{user.email}</div>
                <div className="text-sm text-gray-500">{user.phone}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
            </TableCell>
            <TableCell className="font-medium">{user.totalOrders}</TableCell>
            <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleUserAction(user, "view")}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUserAction(user, "edit")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUserAction(user, "email")}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </DropdownMenuItem>
                  {user.status === "active" && (
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "banned")} className="text-red-600">
                      <Ban className="h-4 w-4 mr-2" />
                      Ban User
                    </DropdownMenuItem>
                  )}
                  {user.status === "banned" && (
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Unban User
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
