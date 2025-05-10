import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddCategory } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  closeModal: () => void;
  onSuccess: () => void;
};

const AddCategories = ({ closeModal, onSuccess }: Props) => {
  const [form, setForm] = useState<AddCategory>({
    category_name: "",
    category_description: "",
  });

  const ADD_API = "http://localhost:3000/categories";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(ADD_API, form);
      onSuccess();
      closeModal();
    } catch (error) {
        console.error("Error submitting", error)
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="category_name"
          placeholder="Name"
          value={form.category_name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <Input
          type="text"
          name="category_description"
          placeholder="Description"
          value={form.category_description}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddCategories;
