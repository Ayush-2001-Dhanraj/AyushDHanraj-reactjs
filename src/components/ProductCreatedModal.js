import React from "react";
import { Box, Typography, Backdrop, Modal, Fade } from "@mui/material";

function ProductCreatedModal({ open, handleClose }) {
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyles}>
          <Typography variant="h6" component="h2" align="center">
            Product Successfully created!
          </Typography>
          <Typography align="center">Redirecting back to Home page!</Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ProductCreatedModal;
