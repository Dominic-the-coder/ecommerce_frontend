import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { toast } from "sonner";

import Header from "../../components/Header";
import { getAllOrders, deleteOrder, updateOrder } from "../../utils/api_orders";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        console.log(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      try {
        const deleted = await deleteOrder(_id);
        if (deleted) {
          // Update state by removing the deleted order
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== _id)
          );
          toast.success("Order deleted successfully");
        } else {
          toast.error("Failed to delete order");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the order");
      }
    }
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const updatedOrder = await updateOrder(_id, newStatus);
      if (updatedOrder) {
        // Update the order in the state with the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === _id ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Products</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row">
                    {order.customerName} <br /> ({order.customerEmail})
                  </TableCell>
                  <TableCell align="right">
                    {order.products.map((product, index) => (
                      <div key={index}>{product.name}</div>
                    ))}
                  </TableCell>
                  <TableCell align="right">${order.totalPrice}</TableCell>
                  <TableCell align="right">
                    <FormControl>
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>     
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{order.paid_at}</TableCell>
                  <TableCell align="right">
                    {order.status === "pending" && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
