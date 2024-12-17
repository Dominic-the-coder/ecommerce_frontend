import axios from "axios";

import { API_URL } from "../constants";

export const getProducts = async (category = "") => {
  try {
    const response = await axios.get(
      API_URL + "/products?category=" + category
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
