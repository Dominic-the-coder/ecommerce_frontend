import { Container, Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {
  getCart,
  deleteItemFromCart,
  getTotalCartPrice,
} from "../../utils/api_cart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Cart() {
  const navigate = useNavigate();
  const cart = getCart();
  return (
    <Container>
      <Header title="Cart" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>{" "}
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        deleteItemFromCart(item._id);
                        toast.success(
                          `${item.name} has been removed from the cart`
                        );
                        navigate("/cart");
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Products Added Yet!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            ${getTotalCartPrice()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            LinkComponent={Link}
            to="/checkout"
            sx={{ textTransform: "none" }}
            disabled={cart.length === 0 ? true : false}
          >
            Checkout
          </Button>
        </Box>
      </TableContainer>
    </Container>
  );
}

export default Cart;
