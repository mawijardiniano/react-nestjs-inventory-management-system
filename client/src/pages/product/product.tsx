import React, { useEffect, useState } from "react";
import { getColumns } from "./column"; // import the function
import { DataTable } from "./dataTable";
import { Product } from "@/lib/types";
import axios from "axios";
import AddProductModal from "../../components/modals/addProduct";

const ProductPage = () => {
  const API = "http://localhost:3000/product";
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleEdit = (product: Product) => {
    console.log("Edit clicked:", product);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = getColumns(handleEdit, handleDelete); 

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-medium text-4xl">Products</h1>
        <button className="bg-black/90 p-2 text-white rounded-md"onClick={openModal}>Add Product</button>
      </div>

      <DataTable columns={columns} data={products} />

      {isOpen && (
        <AddProductModal
          onSuccess={fetchProducts}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProductPage;
