import React, { useState } from "react";
import axios from "axios";
import { AddProduct } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  closeModal: () => void;
  onSuccess: () => void;
};

export default function AddProductModal({ closeModal, onSuccess }: Props) {
  const [form, setForm] = useState<AddProduct>({
    prod_name: "",
    prod_price: "",
    prod_quantity: "",
    prod_description: "",
    category_id: "",
  });

  const ADD_API = "http://localhost:3000/product";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        prod_price: Number(form.prod_price),
        prod_quantity: Number(form.prod_quantity),
        category_id: Number(form.category_id),
      };

      await axios.post(ADD_API, payload);
      onSuccess();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <Input
            type="text"
            name="prod_name"
            onChange={handleChange}
            value={form.prod_name}
            placeholder="Product Name"
            className="border p-2 mb-2 w-full"
            required
          />
          <Input
            type="text"
            name="prod_price"
            onChange={handleChange}
            value={form.prod_price}
            placeholder="Price"
            className="border p-2 mb-2 w-full"
            required
          />
          <Input
            type="text"
            name="prod_quantity"
            onChange={handleChange}
            value={form.prod_quantity}
            placeholder="Quantity"
            className="border p-2 mb-2 w-full"
            required
          />
          <Input
            type="text"
            name="prod_description"
            onChange={handleChange}
            value={form.prod_description}
            placeholder="Description"
            className="border p-2 mb-2 w-full"
            required
          />
          <select
            name="category_id"
            onChange={handleChange}
            value={form.category_id}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Select a Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>

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
}
