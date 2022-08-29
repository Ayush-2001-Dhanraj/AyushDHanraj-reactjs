import React from "react";
import { Grid } from "@mui/material";
import { WindMillLoading } from "react-loadingg";

function LoadingComp(props) {
  return (
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
  );
}

export default LoadingComp;
