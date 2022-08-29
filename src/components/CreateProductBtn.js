import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CreateProductBtn({ mobile }) {
  let navigate = useNavigate();
  return (
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
  );
}

export default CreateProductBtn;
