import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import React, { useEffect, useState } from "react";
import { Product } from "../lib/types";
import axios from "axios";

export default function StatsCard() {
  const API = "http://localhost:3000/product";
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const totalProduct = product.length;
  const lowStock = product.filter((product) => product.prod_quantity  <= 10).length;
  const outOfStock = product.filter((product) => product.prod_quantity === 0).length;
  const InventoryCost = product.reduce((acc, product) => acc + product.prod_price * product.prod_quantity, 0 )

  return (
    <div className="flex flex-row gap-4">
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Total Product</CardTitle>
          <CardDescription>{totalProduct}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
          <CardDescription>{lowStock}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Inventory Value</CardTitle>
          <CardDescription>{InventoryCost.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Out of Stock</CardTitle>
          <CardDescription>{outOfStock}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}
