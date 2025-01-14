import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { signup } from "../../utils/api_auth";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!email || !password) {
      toast.error("Please fill out all the required fields");
    }

    // trigger the add new product API
    const signupData = await signup(name, email, password);

    console.log(signupData);

    // check if the account exists or not
    if (signupData) {
      // show success message
      toast.success(
        "You have created an account successfully, Thank You For Chooosing Us :)"
      );
      // redirect back to home page
      navigate("/login");
    }
  };

  return (
    <Container>
      <Header title="Create a New Account" />
      <Card elevation={5}>
        <CardContent>
          <Box mb={2}>
            <Typography>Name</Typography>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography>Email</Typography>
            <TextField
              label="Email"
              required
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography>Password</Typography>
            <TextField
              type="password"
              label="Password"
              required
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography>Confirm Password</Typography>
            <TextField
              type="password"
              label="Confirm Password"
              required
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Signup;
