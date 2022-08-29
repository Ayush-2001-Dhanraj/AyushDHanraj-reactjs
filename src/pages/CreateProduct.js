import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import ProductCreatedModal from "../components/ProductCreatedModal";
import instance from "../components/AxiosInstance";

function CreateProduct(props) {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);

  const commonStyle = {
    backgroundColor: "white",
    boxShadow: 2,
    borderRadius: "10px",
  };

  let navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateCategories = () => {
    instance.get("/categories").then((response) => {
      setCategories(response?.data?.categories);
    });
  };

  const handleProductSubmit = (values, cleanupFunc) => {
    const payload = {
      name: values.productName,
      price: values.price,
      category: values.category,
      description: values.description,
      avatar: values.imageUrl,
      developerEmail: "dhanrajaayush123@gmail.com",
    };
    try {
      instance.post("/products", payload).then((response) => {
        if (response.status === 201) {
          handleOpen();
          cleanupFunc();
          setTimeout(() => {
            handleClose();
            navigate("/");
          }, 2000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCategories();
    document.title = "Ayush - Create Product";
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "85vh",
      }}
      mb={2}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginTop: 2,
          inlineSize: "100%",
          overflow: "hidden",
          fontWeight: "bold",
        }}
        align="center"
      >
        Create Product
      </Typography>
      <Formik
        initialValues={{
          productName: "",
          description: "",
          imageUrl: "",
          category: "",
          price: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.productName) errors.productName = "Required";
          if (!values.description) errors.description = "Required";
          if (!values.imageUrl) errors.imageUrl = "Required";
          if (!values.category) errors.category = "Required";
          if (!values.price) errors.price = "Required";
          if (isNaN(values.price)) errors.price = "Invalid Number";
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleProductSubmit(values, resetForm);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            style={{ width: "400px", maxWidth: "100%" }}
          >
            <Box mt={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Product Name"
                id="productName"
                name="productName"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
                sx={commonStyle}
              />
              <ErrorMessage name="productName" />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Description"
                id="description"
                rows={4}
                name="description"
                variant="outlined"
                multiline
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                sx={commonStyle}
              />
              <ErrorMessage name="description" />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Image URL"
                id="imageUrl"
                name="imageUrl"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imageUrl}
                sx={commonStyle}
              />
              <ErrorMessage name="imageUrl" />
            </Box>
            <Box mt={2}>
              <FormControl fullWidth size="small">
                {values.category.length === 0 && (
                  <InputLabel id="category">Category</InputLabel>
                )}

                <Select
                  value={values.category}
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="category"
                  placeholder="category"
                  sx={commonStyle}
                >
                  {/* <MenuItem value="">Categories</MenuItem> */}
                  {categories.map((c) => {
                    return (
                      <MenuItem key={c._id} value={c.name}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <ErrorMessage name="category" />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Price"
                id="price"
                name="price"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                sx={commonStyle}
              />
              <ErrorMessage name="price" />
            </Box>

            <Button
              type="submit"
              fullWidth
              sx={{
                ...commonStyle,
                marginTop: 2,
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <ProductCreatedModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default CreateProduct;
