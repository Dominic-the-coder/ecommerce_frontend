import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

// (public api)
export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// (public api)
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCurrentUser = (cookies) => {
  return cookies.currentUser ? cookies.currentUser : null;
};

export const isUserLoggedIn = (cookies) => {
  return getCurrentUser(cookies) ? true : false;
};

export const isAdmin = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.role === "admin" ? true : false;
};

// function to access cookies.currentUser.token
export const getUserToken = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.token ? currentUser.token : "";
};
