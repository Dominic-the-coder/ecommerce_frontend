import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// get products (public data)
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get product (public data)
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new product (admin api)
export const addNewProduct = async (
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/products",
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          // Bearer dmedkefmekfek93kmd3k3od3o...
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update product (admin api)
export const editProduct = async (
  _id,
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/products/" + _id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete product (admin api)
export const deleteProduct = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/products/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
