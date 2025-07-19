import axios from "axios";
import {
  ALL_SUPPLIER_REQUEST,
  ALL_SUPPLIER_SUCCESS,
  ALL_SUPPLIER_FAIL,
  SUPPLIER_DETAILS_REQUEST,
  SUPPLIER_DETAILS_FAIL,
  SUPPLIER_DETAILS_SUCCESS,
  ADMIN_SUPPLIER_FAIL,
  ADMIN_SUPPLIER_REQUEST,
  ADMIN_SUPPLIER_SUCCESS,
  NEW_SUPPLIER_REQUEST,
  NEW_SUPPLIER_SUCCESS,
  NEW_SUPPLIER_FAIL,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAIL,
  CLEAR_ERRORS,
} from "../constants/supplierConstants";

// Get ALL Suppliers
export const getSuppliers = (
  keyword = "",
  currentPage = 1,
  category
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_SUPPLIER_REQUEST });

      let link = `http://localhost:5001/api/v1/suppliers?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `http://localhost:5001/api/v1/suppliers?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      const config = { withCredentials: true };
      const { data } = await axios.get(link, config);

      dispatch({
        type: ALL_SUPPLIER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SUPPLIER_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get Supplier Details
export const getSupplierDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUPPLIER_DETAILS_REQUEST });

      const config = { withCredentials: true };
      const { data } = await axios.get(`http://localhost:5001/api/v1/supplier/${id}`, config);

      dispatch({
        type: SUPPLIER_DETAILS_SUCCESS,
        payload: data.supplier,
      });
    } catch (error) {
      dispatch({
        type: SUPPLIER_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get admin suppliers
export const getAdminSuppliers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SUPPLIER_REQUEST });

    const config = { withCredentials: true };
    const { data } = await axios.get("http://localhost:5001/api/v1/admin/suppliers", config);

    dispatch({ type: ADMIN_SUPPLIER_SUCCESS, payload: data.suppliers });
  } catch (error) {
    dispatch({ type: ADMIN_SUPPLIER_FAIL, payload: error.message });
  }
};

// Create Supplier
export function createSupplier(supplierData) {
  return async function (dispatch) {
    try {
      dispatch({ type: NEW_SUPPLIER_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:5001/api/v1/admin/supplier/new`,
        supplierData,
        config
      );

      dispatch({
        type: NEW_SUPPLIER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SUPPLIER_FAIL,
        payload: error.message,
      });
    }
  };
}

// Delete Supplier
export function deleteSupplier(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_SUPPLIER_REQUEST });

      const config = { withCredentials: true };
      const { data } = await axios.delete(`http://localhost:5001/api/v1/admin/supplier/${id}`, config);

      dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_SUPPLIER_FAIL, payload: error.message });
    }
  };
}

// Update Supplier
export const updateSupplier = (id, supplierData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPPLIER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:5001/api/v1/admin/supplier/${id}`,
      supplierData,
      config
    );

    dispatch({
      type: UPDATE_SUPPLIER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLIER_FAIL,
      payload: error.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};