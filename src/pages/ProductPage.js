import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { WindMillLoading } from "react-loadingg";
import { useTheme } from "@mui/material/styles";
import instance from "../components/AxiosInstance";
import { useParams } from "react-router-dom";

function ProductPage(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState({});

  const updateProucts = () => {
    instance.get(`/products/${id}`).then((response) => {
      setProductDetails(response?.data?.product);
    });
  };

  useEffect(() => {
    updateProucts();
  }, [id]);

  return (
    <Box mb={2}>
      <Box mr={mobile ? 0 : 15} ml={mobile ? 0 : 15} mt={2}>
        {Object.keys(productDetails).length === 0 && (
          <WindMillLoading size="large" />
        )}
        {Object.keys(productDetails).length !== 0 && (
          <>
            <Card
              sx={{
                display: "flex",
                backgroundColor: "transparent",
                boxShadow: 0,
              }}
            >
              <CardMedia
                component="img"
                height="300"
                sx={{
                  width: `${mobile ? "50%" : "300px"}`,
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                }}
                image={productDetails?.avatar}
                alt="Live from space album cover"
              />

              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Typography
                  component="div"
                  variant="h4"
                  gutterBottom
                  sx={{
                    flex: "1 0 auto",
                    fontSize: `${mobile ? "1.2rem" : "2.2rem"}`,
                    fontWeight: "bold",
                  }}
                >
                  {productDetails?.name}
                </Typography>
                <Typography
                  component="div"
                  variant="h5"
                  gutterBottom
                  sx={{ fontSize: `${mobile ? "1.1rem" : "1.6rem"}` }}
                >
                  $ {productDetails?.price}
                </Typography>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              mt={2}
              mb={2}
            >
              <Divider
                sx={{
                  borderBottomWidth: 3,
                  borderColor: "#000",
                  borderRadius: "10px",
                  width: `calc(100% - 20px)`,
                }}
              />
            </Box>
            <Typography
              component="div"
              variant="h5"
              gutterBottom
              sx={{
                fontSize: `${mobile ? "1rem" : "1.2rem"}`,
                fontWeight: "bold",
              }}
            >
              Description
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ opacity: "0.7" }}>
              {productDetails?.description}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductPage;
