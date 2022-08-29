import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList({ mobile, filteredProducts }) {
  let navigate = useNavigate();
  return (
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
                  alt={p.name}
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
  );
}

export default ProductList;
