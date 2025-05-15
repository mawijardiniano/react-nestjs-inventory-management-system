// column.ts
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";

export const getColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: "prod_name",
    header: "Product Name",
  },
  {
    accessorKey: "prod_price",
    header: "Price",
  },
  {
    accessorKey: "prod_quantity",
    header: "Quantity",
  },
  {
    accessorKey: "prod_description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return category?.category_name || "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const quantity = row.original.prod_quantity;

      let status = "Out of Stock";
      let bgColor = "bg-red-200 text-red-800";

      if (quantity > 10) {
        status = "In Stock";
        bgColor = "bg-green-200 text-green-800";
      } else if (quantity > 0) {
        status = "Low Stock";
        bgColor = "bg-yellow-200 text-yellow-800";
      }

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${bgColor}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "value",
    header: "Value",
    cell: ({ row }) => {
      const price = row.original.prod_price || 0;
      const quantity = row.original.prod_quantity || 0;
      const total = price * quantity;
      return `₱${total.toFixed(2)}`;
    },
  },
];
