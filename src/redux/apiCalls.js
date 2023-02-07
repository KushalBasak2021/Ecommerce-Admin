import { loginStart, loginSuccess, loginFailure, logout } from "./userRedux";
import axios from "axios";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./productRedux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./usersRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  console.log("start");
  try {
    const res = await axios.post(
      "https://ecommerce-backend-tf4t.onrender.com/api/auth/login",
      user
    );

    res.data.isAdmin
      ? dispatch(loginSuccess(res.data))
      : dispatch(loginFailure());
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Logout = async (dispatch) => {
  dispatch(logout());
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.get(
      "https://ecommerce-backend-tf4t.onrender.com/api/products"
    );
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());

  try {
    await axios.delete(
      `https://ecommerce-backend-tf4t.onrender.com/api/products/${id}`,
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).adminUser
            ).currentUser.accessToken,
        },
      }
    );
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());

  try {
    await axios.put(
      `https://ecommerce-backend-tf4t.onrender.com/api/products/${id}`,
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).adminUser
            ).currentUser.accessToken,
        },
      }
    );
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(updateProductStart());

  try {
    const res = await axios.post(
      `https://ecommerce-backend-tf4t.onrender.com/api/products`,
      product,
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).adminUser
            ).currentUser.accessToken,
        },
      }
    );
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());

  try {
    const res = await axios.get(
      `https://ecommerce-backend-tf4t.onrender.com/api/users`,
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).adminUser
            ).currentUser.accessToken,
        },
      }
    );
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    await axios.delete(
      `https://ecommerce-backend-tf4t.onrender.com/api/users/${id}`,
      {
        headers: {
          token:
            "Bearer " +
            JSON.parse(
              JSON.parse(localStorage.getItem("persist:root")).adminUser
            ).currentUser.accessToken,
        },
      }
    );
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
