import React from "react";
import { Box, FormControl, Select, MenuItem, TextField } from "@mui/material";

function SearchFilterProduct({
  mobile,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  handleCategoryChange,
  categories,
}) {
  return (
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
  );
}

export default SearchFilterProduct;
