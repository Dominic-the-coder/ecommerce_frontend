import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

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
