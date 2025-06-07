import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import React, { useEffect, useState } from "react";
import { ProductChart } from "../lib/types";
import axios from "axios";

export default function StatsCard() {
  const API = "http://localhost:3000/product";
  const [product, setProduct] = useState<ProductChart[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API);
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = (thisMonth - 1 + 12) % 12;
  const currentYear = now.getFullYear();
  const lastMonthYear = thisMonth === 0 ? currentYear - 1 : currentYear;

  const filterByMonth = (month: number, year: number) =>
    product.filter((p) => {
      const createdAt = new Date(p.createdAt);
      return createdAt.getMonth() === month && createdAt.getFullYear() === year;
    });

  const thisMonthProducts = filterByMonth(thisMonth, currentYear);
  const lastMonthProducts = filterByMonth(lastMonth, lastMonthYear);

  // TOTAL PRODUCTS
  const totalProduct = product.length;
  const totalThisMonth = thisMonthProducts.length;
  const totalLastMonth = lastMonthProducts.length;
  const productPercentChange =
    totalLastMonth === 0
      ? totalThisMonth > 0 ? 100 : 0
      : ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;

  // LOW STOCK ITEMS
  const lowStock = product.filter((p) => p.prod_quantity <= 10).length;
  const lowStockLastMonth = lastMonthProducts.filter((p) => p.prod_quantity <= 10).length;
  const lowStockChange =
    lowStockLastMonth === 0
      ? lowStock > 0 ? 100 : 0
      : ((lowStock - lowStockLastMonth) / lowStockLastMonth) * 100;

  // INVENTORY VALUE
  const inventoryValue = product.reduce((acc, p) => acc + p.prod_price * p.prod_quantity, 0);
  const inventoryValueLastMonth = lastMonthProducts.reduce(
    (acc, p) => acc + p.prod_price * p.prod_quantity,
    0
  );
  const inventoryValueChange =
    inventoryValueLastMonth === 0
      ? inventoryValue > 0 ? 100 : 0
      : ((inventoryValue - inventoryValueLastMonth) / inventoryValueLastMonth) * 100;

  // OUT OF STOCK
  const outOfStock = product.filter((p) => p.prod_quantity === 0).length;
  const outOfStockLastMonth = lastMonthProducts.filter((p) => p.prod_quantity === 0).length;
  const outOfStockChange = outOfStock - outOfStockLastMonth;

  return (
    <div className="flex flex-row gap-4">
      {/* Total Products */}
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
          <CardDescription>{totalProduct}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`${productPercentChange >= 0 ? "+" : ""}${productPercentChange.toFixed(1)}% from last month`}</p>
        </CardContent>
      </Card>

      {/* Low Stock */}
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
          <CardDescription>{lowStock}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`${lowStockChange >= 0 ? "+" : ""}${lowStockChange.toFixed(1)}% from last month`}</p>
        </CardContent>
      </Card>

      {/* Inventory Value */}
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Inventory Value</CardTitle>
          <CardDescription>${inventoryValue.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`${inventoryValueChange >= 0 ? "+" : ""}${inventoryValueChange.toFixed(1)}% from last month`}</p>
        </CardContent>
      </Card>

      {/* Out of Stock */}
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>Out of Stock</CardTitle>
          <CardDescription>{outOfStock}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`${outOfStockChange >= 0 ? "+" : ""}${outOfStockChange} from last month`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
