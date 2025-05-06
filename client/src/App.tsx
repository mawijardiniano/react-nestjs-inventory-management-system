import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/dashboard/dashboard";
import ProductPage from "./pages/product/product";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
