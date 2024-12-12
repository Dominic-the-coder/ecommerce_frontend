import axios from "axios";

// static data
const API_URL = "http://localhost:5555";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL + "/products"); // http://localhost:5555/products
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); // http://localhost:5555/categories
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
