import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import Header from "../../components/Header";
import { getUserToken } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getCategories,
  getCategory,
  updateCategories,
} from "../../utils/api_categories";

function CategoriesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getCategory(id).then((categoryData) => {
      setName(categoryData.name);
    });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedCategories = await updateCategories(id,name, token);

      if (updatedCategories) {
        toast.success("Category has been edited successfully!");
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <Header title="Categories" />
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Edit
          </Typography>
          <Box mb={2}>
            <TextField
              label="Category Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleUpdate}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CategoriesEdit;
