import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AddProduct, Category } from "@/lib/types";

type Props = {
  id: number;
  onSuccess: () => void;
  closeModal: () => void;
};

export default function EditProduct({ id, onSuccess, closeModal }: Props) {
  const [form, setForm] = useState<AddProduct>({
    prod_name: "",
    prod_price: "",
    prod_quantity: "",
    prod_description: "",
    category_id: "",
  });
   const [option, setOption] = useState<Category[]>([]);

  const EDIT_API = (id: number) => `http://localhost:3000/product/${id}`;
    const OPTION_API = "http://localhost:3000/categories";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(EDIT_API(id));
        setForm({
          prod_name: data.prod_name || "",
          prod_price: data.prod_price || "",
          prod_quantity: data.prod_quantity || "",
          prod_description: data.prod_description || "",
          category_id: data.category_id || "",
        });
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { value, name } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: name === "category_id" ? Number(value) : value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(EDIT_API(id), form);
      onSuccess();
      closeModal();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

    const fetchOptions = async () => {
    try {
      const res = await axios.get(OPTION_API);
      setOption(res.data);
    } catch (error) {
      console.error("Error fetching category", error);
    }
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
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
            {option.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
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
