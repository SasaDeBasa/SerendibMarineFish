import axios from "axios";
import {
  ALL_EMPLOYEE_REQUEST,
  ALL_EMPLOYEE_SUCCESS,
  ALL_EMPLOYEE_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_DETAILS_SUCCESS,
  ADMIN_EMPLOYEE_FAIL,
  ADMIN_EMPLOYEE_REQUEST,
  ADMIN_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  CLEAR_ERRORS,
} from "../constants/employeeConstants";

// Get ALL Employees
export const getEmployees = (keyword = "", currentPage = 1) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_EMPLOYEE_REQUEST });

      const link = `http://localhost:5001/api/v1/employees?keyword=${keyword}&page=${currentPage}`;

      const config = { withCredentials: true };
      const { data } = await axios.get(link, config);

      dispatch({
        type: ALL_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EMPLOYEE_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get Employee Details
export const getEmployeeDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

      const config = { withCredentials: true };
      const { data } = await axios.get(`http://localhost:5001/api/v1/employee/${id}`, config);

      dispatch({
        type: EMPLOYEE_DETAILS_SUCCESS,
        payload: data.employee,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get admin employees
export const getAdminEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EMPLOYEE_REQUEST });

    const config = { withCredentials: true };
    const { data } = await axios.get("http://localhost:5001/api/v1/admin/employees", config);

    dispatch({ type: ADMIN_EMPLOYEE_SUCCESS, payload: data.employees });
  } catch (error) {
    dispatch({ type: ADMIN_EMPLOYEE_FAIL, payload: error.message });
  }
};

// Create Employee
export function createEmployee(employeeData) {
  return async function (dispatch) {
    try {
      dispatch({ type: NEW_EMPLOYEE_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:5001/api/v1/admin/employee/new`,
        employeeData,
        config
      );

      dispatch({
        type: NEW_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_EMPLOYEE_FAIL,
        payload: error.message,
      });
    }
  };
}

// Delete Employee
export function deleteEmployee(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_EMPLOYEE_REQUEST });

      const config = { withCredentials: true };
      const { data } = await axios.delete(`http://localhost:5001/api/v1/admin/employee/${id}`, config);

      dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_EMPLOYEE_FAIL, payload: error.message });
    }
  };
}

// Update Employee
export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:5001/api/v1/admin/employee/${id}`,
      employeeData,
      config
    );

    dispatch({
      type: UPDATE_EMPLOYEE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEE_FAIL,
      payload: error.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};