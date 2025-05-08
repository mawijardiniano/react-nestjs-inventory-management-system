import react, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axios from "axios";
import { Category } from "../lib/types";

const Categories = () => {
  const API = "http://localhost:3000/categories";
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      Categories
      <div className="flex flex-row gap-4">
      {categories.map((category, index) => (
        <Card key={index} className="w-72 h-40">
          <CardContent>
            <CardHeader>
              <CardTitle>{category.category_name}</CardTitle>
              <CardDescription>{category.category_description}</CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default Categories;
