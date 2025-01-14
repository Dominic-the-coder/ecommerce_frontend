import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// get categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get category
export const getCategory = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add categories
export const addCategories = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      {
        name: name,
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

// update categories
export const updateCategories = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + `/categories/${_id}`,
      {
        name,
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

// delete categories
export const deleteCategories = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/categories/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
