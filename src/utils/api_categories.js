import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

// (public api)
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const addNewCategory = async (name, token) => {
  // console.log(token);
  try {
    const response = await axios.post(
      API_URL + "/categories",
      { name },
      { headers: { Authorization: "Bearer " + token } }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const updateCategory = async (id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + id,
      {
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/categories/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
