import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";
import { Button } from "../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "prod_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "prod_price",
    header: "Product Price",
  },
  {
    accessorKey: "prod_quantity",
    header: "Product Quantity",
  },
  {
    accessorKey: "prod_description",
    header: "Product Description",
  },
  {
    accessorKey: "category",
    header: "Product Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return category?.category_name || "N/A";
    },
  },
];
