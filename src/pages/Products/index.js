import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import Header from "../../components/Header";
import { toast } from "sonner";

import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import { deleteProduct } from "../../utils/api_products";
import { AddToCart } from "../../utils/api_cart";

function Products() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleAddToCart = (product) => {
    // trigger add to cart function
    AddToCart(product);
    toast.success(`${product.name} has been added to Cart`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id);
      if (deleted) {
        // get the latest products data from the API again
        const latestProducts = await getProducts(category, page);
        // update the products state with the latest data
        setProducts(latestProducts);
        // show success message
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4">Products</Typography>
        <Button
          LinkComponent={Link}
          to="/products/new"
          variant="contained"
          color="success"
        >
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
            onChange={(event) => {
              setCategory(event.target.value);
              // reset the page back to page 1
              setPage(1);
            }}
          >
            <MenuItem value="all">All Products</MenuItem>
            {categories.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Card
                variant="outlined"
                sx={{ borderRadius: "8px", boxShadow: 3 }}
              >
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
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
                  </Box>
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
                    onClick={() => {
                      handleAddToCart(product);
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
                      LinkComponent={Link}
                      to={`/products/${product._id}/edit`}
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
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  No product found.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: "20px 0 40px 0",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          <ArrowLeft />
          Prev
        </Button>
        <span>Page {page}</span>
        <Button
          variant="contained"
          color="secondary"
          disabled={products.length === 0 ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ArrowRight />
        </Button>
      </Box>
    </Container>
  );
}

export default Products;
