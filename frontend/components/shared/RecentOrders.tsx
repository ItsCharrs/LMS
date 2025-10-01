// frontend/components/shared/RecentOrders.tsx
"use client";

import { useApi } from "@/hooks/useApi";
import { Order } from "@/types";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function RecentOrders() {
  // We can use query params to limit the results on the backend
  const { data: orders, isLoading } = useApi<Order[]>('/orders/?limit=5');

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
          ) : orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="font-medium">{order.customer.first_name} {order.customer.last_name}</div>
                <div className="text-sm text-gray-500">{order.customer.email}</div>
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right">
                <Link href={`/orders/${order.id}`} passHref>
                  <Button variant="outline" size="sm">Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}