import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import {
  addCategories,
  deleteCategories,
  getCategories,
} from "../../utils/api_categories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Categories() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormAdd = async (event) => {
    event.preventDefault();
    // check for error
    if (!category) {
      toast.error("Please fill out all the required fields");
    }

    // trigger the add new product API
    const newCategoriesData = await addCategories(category, token);

    // check if the newProductData exists or not
    if (newCategoriesData) {
      // show success message
      toast.success("Product has been added successfully");
      // redirect back to home page
      navigate("/");
    }
  };

  const handleDelete = async (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        const deleted = await deleteCategories(id, token);
        if (deleted) {
          // get the latest products data from the API again
          const latestCategories = await getCategories(category);
          // update the products state with the latest data
          setCategories(latestCategories);
          // show success message
          toast.success("Product deleted successfully");
        } else {
          toast.error("Failed to delete product");
        }
      }
    };

  return (
    <Container>
      <Header title="Categories" />
      <Box mb={2}>
        <TextField
          label="Category Name"
          required
          fullWidth
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleFormAdd}
        sx={{ marginBottom: "20px" }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        handleDelete(category._id);
                        toast.success(
                          `${category.name} has been removed from the cart`
                        );
                        navigate("/categories");
                      }}
                    >
                      Remove
                    </Button>

                    <Button
                      variant="contained"
                      LinkComponent={Link}
                      to={`/categories/${category._id}/edit`}
                      color="primary"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Categories Added Yet!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Categories;
