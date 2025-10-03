// frontend/components/shared/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return <Badge className={statusStyles[status]}>{status}</Badge>;
}