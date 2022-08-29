import React from "react";
import { Grid } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

function NoDataComp(props) {
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
        <ReportGmailerrorredIcon fontSize="large" />
      </Grid>
    </Grid>
  );
}

export default NoDataComp;
