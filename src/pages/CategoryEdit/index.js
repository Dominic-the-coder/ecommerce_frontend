import Header from "../../components/Header";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateCategory, getCategory } from "../../utils/api_categories";

import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  //states
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getCategory(id).then((data) => {
      setLoading(false);
      setCategory(data.category);
      setName(data.name);
      console.log(data);
    });
  }, [id]);

  //update category handler
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error("put something la");
    } else {
      // trigger the API
      const updatedCategory = await updateCategory(id, name, token);

      if (updatedCategory) {
        toast.success("category has been edited");
        navigate("/categories");
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Category
            </Typography>
            {loading ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <>
                <Box mb={2}>
                  <TextField
                    label="Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default CategoryEdit;
