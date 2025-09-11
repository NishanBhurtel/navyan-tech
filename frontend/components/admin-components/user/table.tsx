import moment from "moment"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/user-components/ui/table"
import { User } from "@/app/admin/types"
export interface UsersTableProps {
  users: User[]
}

export default function UsersTable({
  users,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Created At</TableHead>
          {/* <TableHead>Orders</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-medium text-gray-900">{user.firstName+" "+user.lastName}</div>
                  <div className="text-sm text-gray-500">ID: {user._id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="text-sm text-gray-900">{user.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="text-sm text-gray-500">{user.phoneNumber}</div>
              </div>
            </TableCell>
             <TableCell>
              <div>
                <div className="text-sm text-gray-500">{moment(user.createdAt).format('llll')}</div>
              </div>
            </TableCell>
            {/* <TableCell className="font-medium">{user.totalOrders}</TableCell> */}

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
