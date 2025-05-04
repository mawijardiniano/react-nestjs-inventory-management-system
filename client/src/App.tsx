import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../src/components/ui/button";
import Layout from "./layout";
export interface User {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  prod_name: string;
  prod_price: number;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <Layout>
    <div className="flex flex-row">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} {user.createdAt} {user.updatedAt}
          </p>
        ))}
      </ul>
      <h1 className="text-5xl font-bold">Products</h1>
      <Button>Click Me</Button>

      <table className="">
        <thead className="border-2 border-black">
          <tr className="border-1">
            <th className="border-2 border-black p-4">name</th>
            <th className="border-2 border-black p-4">price</th>
          </tr>
        </thead>
        <tbody>
          {product.map((products) => (
            <tr key={products.id}>
              <td className="border-2 border-black p-4">{products.prod_name}</td>
              <td className="border-2 border-black p-4">{products.prod_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default UsersList;