import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  category_id: number;
  category_name: string;
  category_description: string;
}

interface Product {
  id: number;
  prod_name: string;
  prod_price: number;
  prod_quantity: number;
  prod_description: string;
  category: Category;
}

const Haha = () => {
  const API = "http://localhost:3000/product";
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {product.map((product, index) => (
        <li key={index}>
            <p>{product.prod_name}</p>
            <p>{product.prod_price}</p>
            <p>{product.category.category_name}</p>
            <p>{product.category.category_description}</p>
        </li>
      ))}
    </div>
  );
};

export default Haha;
