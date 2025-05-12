// column.ts
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';

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
        <div className="flex gap-6">
          <Pencil
          className="text-gray-600"
            onClick={() => showEditModal(product.id)}
          >
            Edit
          </Pencil>
          <Trash2
          className="text-red-500"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Trash2>
        </div>
      );
    },
  },
];
