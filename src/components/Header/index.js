import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";

function Header() {
  return (
    <Box sx={{ textAlign: "center", pt: 5 }}>
      <Typography style={{ fontWeight: 700 }} variant="h4" component="div">
        Welcome to My Store
      </Typography>
      <Divider sx={{ pt: 3 }}></Divider>
    </Box>
  );
}

export default Header;
