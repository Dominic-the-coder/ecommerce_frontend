import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { editProduct, getProduct } from "../../utils/api_products";
import { getUserToken } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { getCategories } from "../../utils/api_categories";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
    });
  }, [id]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedProduct = await editProduct(
        id,
        name,
        description,
        price,
        category,
        image,
        token
      );

      if (updatedProduct) {
        toast.success("Product has been edited successfully!");
        navigate("/");
      }
    }
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage(image_url);
  };

  return (
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Product
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                required
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Description"
                required
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Price"
                required
                fullWidth
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setCategory(event.target.value);
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem value={category._id}>{category.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              {image !== "" ? (
                <>
                  <div>
                    <img
                      src={`${API_URL}/${image}`}
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                      }}
                    />
                  </div>
                  <button onClick={() => setImage("")}>Remove</button>
                </>
              ) : (
                <ButtonUpload
                  onFileUpload={(files) => {
                    // handleImageUpload
                    if (files && files[0]) {
                      handleImageUpload(files);
                    }
                  }}
                />
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Update
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" ml={2}>
          Loading...
        </Typography>
      </Backdrop>
    </>
  );
}

export default ProductEdit;
