import { Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  // using useLocation and calling its function in a variable
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
        mt={3}
      >
        {isActive("/") ? "Welcome to my Store" : "Cart"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Button
          variant={isActive("/") ? "contained" : "outlined"}
          onClick={() => {
            navigate("/");
          }}
          sx={{ marginRight: "10px" }}
        >
          Home
        </Button>
        <Button
          variant={isActive("/products/cart") ? "contained" : "outlined"}
          onClick={() => {
            navigate("/products/cart");
          }}
        >
          Cart
        </Button>
      </Box>
    </Box>
  );
}
