import Header from "../../components/Header";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  addNewCategory,
  deleteCategory,
} from "../../utils/api_categories";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  // get categories
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  // if is not admin, redirect to home page
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async () => {
    //check for error
    if (!name) {
      toast.error("Please fill out all the required fields");
    }

    //trigger the add new category API
    const newCategory = await addNewCategory(name, token);

    // check if the newCategory exist or not
    if (newCategory) {
      const newData = await getCategories();
      setCategories(newData);
      // clear the input field
      setName("");
      // show success error
      toast.success("Category has been added successfully");
    }
  };

  const handleDelete = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const deleted = await deleteCategory(_id, token);
      if (deleted) {
        const latestCategories = await getCategories();
        setCategories(latestCategories);
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" mb={4}>
        Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableCell>
            <Box mb={2} display="flex">
              <TextField
                label="Category Name"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                // v1
                // onClick={handleFormSubmit}
                // v2
                onClick={() => handleFormSubmit()}
              >
                ADD
              </Button>
            </Box>
          </TableCell>
        </Table>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow>
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    color="primary"
                    size="small"
                    to={`/categories/${category._id}`}
                  >
                    EDIT
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(category._id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Categories;
