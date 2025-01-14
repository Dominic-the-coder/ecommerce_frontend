import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { login } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!email || !password) {
      toast.error("Please fill out all the required fields");
    }

    // trigger the API
    const loginData = await login(email, password);

    // set cookies
    setCookie("currentUser", loginData, {
      maxAge: 60 * 60 * 24 * 30, // second * minutes * hours * days
    });

    console.log(loginData);

    // check if the account exists or not
    if (loginData) {
      // show success message
      toast.success("You have login successfully, Happy Shopping :)");
      // redirect back to home page
      navigate("/");
    }
  };

  return (
    <Container>
      <Header title="Login to Your Account" />
      <Card elevation={5}>
        <CardContent>
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

export default Login;
