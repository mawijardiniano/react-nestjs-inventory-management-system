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
import AddCategories from "./modals/addCategories";
import { Button } from "./ui/button";

const Categories = () => {
  const API = "http://localhost:3000/categories";
  const DELETE_API = (id: number) => `http://localhost:3000/categories/${id}`;
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setOpen] = useState(false);
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

  const deleteCategory = async (id: number) => {
    try {
      const res = await axios.delete(DELETE_API(id));
      fetchCategories()
    } catch (error) {
      
    }
  }

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between px-2 pb-4 w-full">
        <p className="text-3xl font-medium">Categories</p>
        <Button className="bg-black/90 text-white" onClick={openModal}>Add Category</Button>
      </div>
    
      {isOpen && (
        <AddCategories closeModal={closeModal} onSuccess={fetchCategories} />
      )}
      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="w-72 h-40">
            <CardContent>
              <CardHeader>
                <CardTitle>{category.category_name}</CardTitle>
                <CardDescription>
                  {category.category_description}
                </CardDescription>
              </CardHeader>
              <div className="flex flex-row justify-between">
              {/* <button onClick={() => deleteCategory(category.category_id)}>Edit</button> */}
              <button onClick={() => deleteCategory(category.category_id)}>Delete</button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
