import React from "react";
import HomePage from "./HomePage";
import CreateProduct from "./CreateProduct";
import ProductPage from "./ProductPage";
import Header from "../components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Pages(props) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
