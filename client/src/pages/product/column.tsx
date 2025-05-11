// column.ts
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";
import { Button } from "../../components/ui/button";

export const getColumns = (
  showEditModal: (id: number) => void,
  handleDelete: (id: number) => void
): ColumnDef<Product>[] => [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showEditModal(product.id)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
