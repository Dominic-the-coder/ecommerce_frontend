import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL + "/orders");
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  try {
    const response = await axios.post(API_URL + "/orders", {
      customerName,
      customerEmail,
      products,
      totalPrice,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateOrder = async (_id, status) => {
  try {
    const response = await axios.put(API_URL + `/orders/${_id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteOrder = async (_id) => {
  try {
    const response = await axios.delete(API_URL + `/orders/${_id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
