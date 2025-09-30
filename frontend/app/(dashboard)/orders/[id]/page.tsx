// frontend/app/(dashboard)/orders/[id]/page.tsx
"use client";

import { useApi } from "@/hooks/useApi";
import { Order } from "@/types";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const { data: order, error, isLoading } = useApi<Order>(orderId ? `/orders/${orderId}/` : null);

  if (isLoading) return <div className="p-6">Loading order details...</div>;
  if (error) return <div className="p-6">Failed to load order. It may not exist.</div>;
  if (!order) return <div className="p-6">Order not found.</div>;

  const calculateSubtotal = () => {
    return order.items.reduce((acc, item) => acc + item.quantity * parseFloat(item.price_at_order), 0);
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/orders" className="text-blue-600 hover:underline">
          &larr; Back to All Orders
        </Link>
        <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold">Order Details</h1>
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                {order.status}
            </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <p>{order.customer.first_name} {order.customer.last_name}</p>
          <p className="text-sm text-gray-600">{order.customer.email}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Order Date</h2>
          <p>{new Date(order.order_date).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold p-4 border-b">Items</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Price at Order</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.product.name}</TableCell>
                <TableCell>{item.product.sku}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">${parseFloat(item.price_at_order).toFixed(2)}</TableCell>
                <TableCell className="text-right">${(item.quantity * parseFloat(item.price_at_order)).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold bg-gray-50">
                <TableCell colSpan={4} className="text-right">Subtotal</TableCell>
                <TableCell className="text-right">${calculateSubtotal().toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}