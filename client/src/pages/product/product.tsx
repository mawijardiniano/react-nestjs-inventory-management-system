import React, { useEffect, useState } from "react";
import { columns } from "./column";
import { DataTable } from "./dataTable";
import { Product } from "@/lib/types";
import axios from "axios";

const ProductPage = () => {
  const API = "http://localhost:3000/product";
  const [products, setProducts] = useState<Product[]>([]);

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

  return <DataTable columns={columns} data={products} />;
};

export default ProductPage;
