import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddProduct, Category } from "@/lib/types";
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

  const [errors, setErrors] = useState({
    prod_price: "",
    prod_quantity: "",
  });

  const [option, setOption] = useState<Category[]>([]);

  const ADD_API = "http://localhost:3000/product";
  const OPTION_API = "http://localhost:3000/categories";

const validateField = (name: string, value: string) => {
  let error = "";
  if (name === "prod_price") {
    if (value.trim() === "") {
      error = "Please enter the product price.";
    } else if (isNaN(Number(value)) || Number(value) < 0) {
      error = "Price must be a valid number.";
    }
  } else if (name === "prod_quantity") {
    if (value.trim() === "") {
      error = "Please enter the quantity in stock.";
    } else if (isNaN(Number(value)) || Number(value) < 0) {
      error = "Quantity must be a valid number.";
    }
  }
  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "prod_price" || name === "prod_quantity") {
      validateField(name, value);
    }
  };

  const validateForm = () => {
    validateField("prod_price", form.prod_price);
    validateField("prod_quantity", form.prod_quantity);

    return (
      errors.prod_price === "" &&
      errors.prod_quantity === "" &&
      form.prod_price !== "" &&
      form.prod_quantity !== ""
    );
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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
          <div className="flex flex-row gap-2">
            <div className="w-full">
              <Input
                type="text"
                name="prod_price"
                onChange={handleChange}
                value={form.prod_price}
                placeholder="Price"
                className="border p-2 mb-1 w-full"
                required
              />
              {errors.prod_price && (
                <p className="text-red-500 text-sm mt-[-4px]">{errors.prod_price}</p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="text"
                name="prod_quantity"
                onChange={handleChange}
                value={form.prod_quantity}
                placeholder="Quantity"
                className="border p-2 mb-1 w-full"
                required
              />
              {errors.prod_quantity && (
                <p className="text-red-500 text-sm mt-[-4px]">{errors.prod_quantity}</p>
              )}
            </div>
          </div>
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
