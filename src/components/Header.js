import React from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} mt={2} onClick={() => navigate("/")}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: "black",
          fontStyle: "italic",
          borderRadius: "10px",
          boxShadow: 2,
        }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            UPayments Store
          </Typography>
          <Button
            color="inherit"
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
