import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
