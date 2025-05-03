import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the user data type
export interface User {
  id: number;
  name: string;
  createdAt: string;
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
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
const fetchProduct = async () => {
  try {
    const res = await axios.get('http://localhost:3000/product');
    setProduct(res.data)
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}
fetchProduct();
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} {user.createdAt}</li>
        ))}
      </ul>
      <h1>Products</h1>
      <ul>
        {product.map((products) => (
          <li key={products.id}>{products.prod_name} {products.prod_price}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
