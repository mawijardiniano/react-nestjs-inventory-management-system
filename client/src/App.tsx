import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/dashboard/dashboard";
import ProductPage from "./pages/product/product";
import ReportPage from "./pages/reports/reports";
import CategoriesPage from "./pages/categories/categories";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
