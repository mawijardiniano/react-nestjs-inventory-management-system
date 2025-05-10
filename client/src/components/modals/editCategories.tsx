import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddCategory } from "@/lib/types";

type Props = {
  id: number;
  closeModal: () => void;
  onSuccess: () => void;
};

const EditCategories = ({ id, closeModal, onSuccess }: Props) => {
  const [form, setForm] = useState<AddCategory>({
    category_name: "",
    category_description: "",
  });

  const EDIT_API = (id: number) => `http://localhost:3000/categories/${id}`;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(EDIT_API(id));
        setForm({
          category_name: res.data.category_name || "",
          category_description: res.data.category_description || "",
        });
      } catch (error) {
        console.error("Error fetching category data", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(EDIT_API(id), form);
      onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error submitting", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="category_name"
            placeholder="Name"
            value={form.category_name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="category_description"
            placeholder="Description"
            value={form.category_description}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;
