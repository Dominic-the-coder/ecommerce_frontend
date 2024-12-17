import { Typography, Box } from "@mui/material";

function Header() {
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
        Welcome To My Store
      </Typography>
    </Box>
  );
}

export default Header;
