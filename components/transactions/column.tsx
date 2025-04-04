"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/utils";
import { TransactionResponse } from "@/constants/models/transaction.model";
import { Badge } from "../ui/badge";
import { formatCurrency } from "../dashboards/formatCurrency";

export const TransactionColumns: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type = row.original.type;
      switch (type) {
        case "BookingPayment": {
          return <span>Thanh toán chuyến đi</span>
        }
        case "PlatformFee": {
          return <span>Phí nền tảng</span>
        }
        case "OwnerEarning": {
          return <span>Lợi nhuận chủ xe</span>
        }
        case "Withdrawal": {
          return <span>Rút tiền</span>
        }
        case "Refund": {
          return <span>Hoàn tiền</span>
        }
        case "Compensation": {
          return <span>Đền bù</span>
        }
      }
    }
  },
  {
    accessorKey: "amount",
    header: "Lượng tiền",
    cell: ({ row }) => {
      return <span>{formatCurrency(row.original.amount)}</span>
    }
  },
  {
    accessorKey: "balanceAfter",
    header: "Số dư sau giao dịch",
    cell: ({ row }) => {
      return <span>{formatCurrency(row.original.balanceAfter)}</span>
    }
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case "Pending": {
          return <Badge className="bg-yellow-500 text-white">Đang thực hiện</Badge>
        }
        case "Completed": {
          return <Badge className="bg-green-600 text-white">Hoàn tất</Badge>
        }
        case "Failed": {
          return <Badge className="bg-#E74C3C text-white">Thất bại</Badge>
        }
        case "Cancelled": {
          return <Badge className="bg-#BDC3C7 text-white">Hủy</Badge>
        }
      }
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return formatDate(createdAt.toString());
    }
  },
];
