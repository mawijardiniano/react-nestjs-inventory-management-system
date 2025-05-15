import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category, Product } from "@/lib/types";

const CategoryBreakdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/product"),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;

  const getProductCount = (categoryId: number) =>
    products.filter((product) => product.category?.category_id === categoryId).length;

  return (
    <div className="w-80 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Category Breakdown</h1>
      <div className="space-y-4">
        {categories.map((cat) => {
          const count = getProductCount(cat.category_id);
          const percent = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;

          return (
            <div key={cat.category_id}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{cat.category_name}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{count} product{count !== 1 && 's'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
