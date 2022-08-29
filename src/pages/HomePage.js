import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import CreateProductBtn from "../components/CreateProductBtn";
import LoadingComp from "../components/LoadingComp";
import NoDataComp from "../components/NoDataComp";
import SearchFilterProduct from "../components/SearchFilterProduct";
import ProductList from "../components/ProductList";
import instance from "../components/AxiosInstance";

function HomePage(props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const updateProucts = () => {
    instance.get("/products").then((response) => {
      setProducts(response?.data?.products);
      setFilteredProducts(response?.data?.products);
    });
  };

  const updateCategories = () => {
    instance.get("/categories").then((response) => {
      setCategories(response?.data?.categories);
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value.length) {
      const temp = products.filter(
        (p) => p.category.toLowerCase() === event.target.value.toLowerCase()
      );
      setFilteredProducts(temp);
    } else {
      setFilteredProducts(products);
    }
    setSearchTerm("");
  };

  const updateProductsWithTerm = () => {
    const pattern = new RegExp(searchTerm, "i");
    let temp = [];
    if (selectedCategory)
      temp = products.filter(
        (p) =>
          pattern.test(p.name) &&
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    else temp = products.filter((p) => pattern.test(p.name));
    setFilteredProducts(temp);
  };

  useEffect(() => {
    updateProucts();
    updateCategories();
    document.title = "Ayush - HomePage";
  }, []);

  useEffect(() => {
    updateProductsWithTerm();
  }, [searchTerm]);

  return (
    <Box mt={2} mb={2}>
      {/* search/filter container */}
      <SearchFilterProduct
        mobile={mobile}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
      />
      {/* Component for loading and no data */}
      {products.length === 0 && <LoadingComp />}
      {products.length !== 0 && filteredProducts.length === 0 && <NoDataComp />}
      {/* product list */}
      <ProductList mobile={mobile} filteredProducts={filteredProducts} />
      <CreateProductBtn mobile={mobile} />
    </Box>
  );
}

export default HomePage;
