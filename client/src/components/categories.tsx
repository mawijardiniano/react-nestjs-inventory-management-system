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
import EditCategories from "./modals/editCategories";
import DeleteCategory from "./modals/deleteCategory";
import { Button } from "./ui/button";

const Categories = () => {
  const API = "http://localhost:3000/categories";
  const DELETE_API = (id: number) => `http://localhost:3000/categories/${id}`;
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const fetchCategories = async () => {
    try {
           const token = localStorage.getItem("token");
const res = await axios.get(API, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const openDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(DELETE_API(id));
      fetchCategories();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };
  const onSuccess = () => {
    fetchCategories();
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between px-2 pb-4 w-full">
        <p className="text-3xl font-medium">Categories</p>
        <Button className="bg-black/90 text-white" onClick={openModal}>
          Add Category
        </Button>
      </div>

      {isOpen && (
        <AddCategories closeModal={closeModal} onSuccess={fetchCategories} />
      )}
      {showModal && selectedId !== null && (
        <EditCategories
          id={selectedId}
          closeModal={closeEditModal}
          onSuccess={onSuccess}
        />
      )}

      {showDeleteModal && selectedId !== null && (
        <DeleteCategory
          id={selectedId}
          onConfirm={deleteCategory}
          onClose={closeDeleteModal}
        />
      )}
     <div className="flex flex-wrap gap-4">
  {categories.map((category, index) => (
    <Card key={index} className="w-72 h-40 flex justify-center">
      <CardHeader className="px-4">
        <CardTitle className="text-2xl">
          {category.category_name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {category.category_description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex flex-row justify-between items-center">
          <Button
            variant="outline"
            className="px-3 py-1 text-sm"
            onClick={() => handleEdit(category.category_id)}
          >
            Edit
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
            onClick={() => openDelete(category.category_id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

    </div>
  );
};

export default Categories;
