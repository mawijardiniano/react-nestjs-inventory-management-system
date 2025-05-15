import React, { useEffect, useState } from "react";
import { getColumns } from "./column"; // import the function
import { DataTable } from "./dataTable";
import { Product } from "@/lib/types";
import axios from "axios";
import EditProduct from "../../components/modals/editProduct";
import DeleteProduct from "../../components/modals/deleteProduct";

const ReportPage = () => {
  const API = "http://localhost:3000/product";
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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



  const closeEditModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const onSuccess = () => {
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = getColumns();

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="font-medium text-4xl">Reports</h1>
      </div>

      <DataTable columns={columns} data={products} />

      {showModal && selectedId !== null && (
        <EditProduct
          id={selectedId}
          onSuccess={onSuccess}
          closeModal={closeEditModal}
        />
      )}

     {showDelete && selectedId !== null && (
  <DeleteProduct
    id={selectedId}
    onConfirm={(id) => {
      handleDelete(id);
      setShowDelete(false);
      setSelectedId(null);
    }}
    onClose={() => {
      setShowDelete(false);
      setSelectedId(null);
    }}
  />
)}

    </div>
  );
};

export default ReportPage;
