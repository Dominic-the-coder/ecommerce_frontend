import { useState, useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Header from "../../components/Header";

import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" color="success">
          Add New
        </Button>
      </Box>
      <Box
        sx={{
          padding: "10px 0",
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value="all">All Items</MenuItem>
            {categories.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" sx={{ borderRadius: "8px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="green" fontWeight="bold">
                  ${product.price}
                </Typography>
                <Typography
                  sx={{
                    display: "inline-block",
                    padding: "2px 8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    marginTop: "5px",
                    textTransform: "capitalize",
                  }}
                  color="textSecondary"
                >
                  {product.category}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "block", padding: "16px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "#1976d2",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  Add to Cart
                </Button>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{
                    marginLeft: "0px !important",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none", marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products;
