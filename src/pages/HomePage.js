import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { WindMillLoading } from "react-loadingg";
import { useNavigate } from "react-router-dom";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  useMediaQuery,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Fab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import instance from "../components/AxiosInstance";

function HomePage(props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  let navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    updateProductsWithTerm();
  }, [searchTerm]);

  return (
    <Box mt={2} mb={2}>
      {/* search/filter container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: `${mobile ? "100%" : "400px"}`,
            boxShadow: 1,
          }}
        >
          <TextField
            fullWidth
            hiddenLabel={searchTerm.length !== 0}
            size="small"
            placeholder="Search Product"
            id="outlined-basic"
            value={searchTerm}
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: `${mobile ? "100%" : "300px"}`,
            boxShadow: 1,
          }}
        >
          <FormControl fullWidth size="small">
            <Select
              value={selectedCategory}
              displayEmpty
              onChange={handleCategoryChange}
              label="catrgory"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Categories</MenuItem>
              {categories.map((c) => {
                return (
                  <MenuItem key={c._id} value={c.name}>
                    {c.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {products.length === 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <WindMillLoading size="large" />
          </Grid>
        </Grid>
      )}
      {products.length !== 0 && filteredProducts.length === 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <ReportGmailerrorredIcon fontSize="large" />
          </Grid>
        </Grid>
      )}
      {/* product list */}
      <Box mr={mobile ? 0 : 15} ml={mobile ? 0 : 15} mt={2}>
        <Grid container spacing={4}>
          {filteredProducts.map((p) => (
            <Grid key={p._id} item md={3} sm={6} xs={12}>
              <Card
                sx={{ backgroundColor: "transparent", boxShadow: 0 }}
                onClick={() => navigate(`/productpage/${p._id}`)}
              >
                <CardActionArea>
                  <CardMedia
                    sx={{
                      backgroundColor: "white",
                      padding: "30px",
                      borderRadius: "10px",
                    }}
                    component="img"
                    height="240"
                    width="100"
                    image={p.avatar}
                    alt="green iguana"
                  />
                  <CardContent
                    sx={{ backgroundColor: "transparent", padding: "0" }}
                  >
                    <Tooltip title={p.name.length > 17 ? p.name : ""}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        sx={{
                          margin: 0,
                          inlineSize: "100%",
                          overflow: "hidden",
                          fontWeight: "bold",
                        }}
                      >
                        {p.name.length > 17
                          ? p.name.slice(0, 17) + " ..."
                          : p.name}
                      </Typography>
                    </Tooltip>
                    <Typography ariant="body1" gutterBottom align="center">
                      $ {p.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: `${mobile ? "10px" : "30px"}`,
          right: `${mobile ? "10px" : "30px"}`,
        }}
      >
        <Fab
          aria-label="add"
          style={{ backgroundColor: "#000" }}
          onClick={() => navigate("/createproduct")}
        >
          <AddIcon fontSize="large" sx={{ color: "white" }} />
        </Fab>
      </Box>
    </Box>
  );
}

export default HomePage;
