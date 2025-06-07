import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/lib/types";

const InventorySummary = () => {
  const API = "http://localhost:3000/product";
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
     const token = localStorage.getItem("token");
const res = await axios.get(API, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProduct = products.length;
  const inStock = products.filter((p) => p.prod_quantity > 10).length;
  const lowStock = products.filter(
    (p) => p.prod_quantity > 0 && p.prod_quantity <= 10
  ).length;
  const outStock = products.filter((p) => p.prod_quantity === 0).length;
  const totalValue = products.reduce(
    (acc, p) => acc + p.prod_price * p.prod_quantity,
    0
  );

  return (
    <div className="">
      <div className="w-full h-70 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Inventory Summary
        </h1>

        <div className="flex justify-between py-1 font-medium">
          <p>Total Products</p>
          <p>{totalProduct}</p>
        </div>

        <div className="flex justify-between py-1 font-medium">
          <p>In Stock</p>
          <p>{inStock}</p>
        </div>

        <div className="flex justify-between py-1 font-medium">
          <p>Low Stock</p>
          <p>{lowStock}</p>
        </div>

        <div className="flex justify-between py-1 font-medium">
          <p>Out Stock</p>
          <p>{outStock}</p>
        </div>

        <div className="flex justify-between py-1 font-semibold mt-2 border-t pt-2">
          <p>Total Value</p>
          <p>₱{totalValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
