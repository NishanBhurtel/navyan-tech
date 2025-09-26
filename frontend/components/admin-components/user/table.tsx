import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/user-components/ui/table";
import { User } from "@/app/admin/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";

export interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Card className="py-6">
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.N.</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created At</TableHead>
                {/* <TableHead>Orders</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={user._id}>
                  <TableCell className="py-4">{String(i + 1)}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-sm text-gray-900">
                          {user.firstName + " " + user.lastName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <div className="text-sm text-gray-500">
                        {user.phoneNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <div className="text-sm text-gray-500">
                        {moment(user.createdAt).format("llll")}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
