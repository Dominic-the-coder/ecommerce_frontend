import { Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const { title = "Welcome To My Store" } = props;
  const location = useLocation();

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
      >
        {title}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} sx={{ marginTop: 1 }}>
        <Button
          variant={location.pathname === "/" ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/"
          sx={{
            padding: "10px 20px",
          }}
        >
          Home
        </Button>

        <Button
          variant={location.pathname === "/cart" ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/cart"
          sx={{
            padding: "10px 20px",
          }}
        >
          Cart
        </Button>

        <Button
          variant={location.pathname === "/orders" ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/orders"
          sx={{
            padding: "10px 20px",
          }}
        >
          My Orders
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
