import {
    ALL_EMPLOYEE_REQUEST,
    ALL_EMPLOYEE_SUCCESS,
    ALL_EMPLOYEE_FAIL,
    ADMIN_EMPLOYEE_REQUEST,
    ADMIN_EMPLOYEE_SUCCESS,
    ADMIN_EMPLOYEE_FAIL,
    CLEAR_ERRORS,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_RESET,
    EMPLOYEE_DETAILS_FAIL,
    NEW_EMPLOYEE_REQUEST,
    NEW_EMPLOYEE_SUCCESS,
    NEW_EMPLOYEE_FAIL,
    NEW_EMPLOYEE_RESET,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_RESET,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_RESET,
  } from "../constants/employeeConstants";
  
  export const employeesReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
      case ALL_EMPLOYEE_REQUEST:
      case ADMIN_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true,
          employees: [],
        };
      case ADMIN_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          employees: action.payload,
        };
      case ALL_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          employees: action.payload.employees,
          employeesCount: action.payload.employeesCount,
          resultPerPage: action.payload.resultPerPage,
          filteredEmployeeCount: action.payload.filteredEmployeeCount,
        };
      case ALL_EMPLOYEE_FAIL:
      case ADMIN_EMPLOYEE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const employeeDetailsReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
      case EMPLOYEE_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case EMPLOYEE_DETAILS_SUCCESS:
        return {
          loading: false,
          employee: action.payload,
          success: true,
        };
      case EMPLOYEE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case EMPLOYEE_DETAILS_RESET:
        return {
          success: false,
          ...state,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newEmployeeReducer = (state = { newEmployeeData: {} }, action) => {
    switch (action.type) {
      case NEW_EMPLOYEE_REQUEST:
        return { loading: true };
      case NEW_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload.success,
          newEmployeeData: action.payload.data,
        };
      case NEW_EMPLOYEE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case NEW_EMPLOYEE_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export function deleteUpdateEmployeeReducer(state = { employee: {} }, action) {
    switch (action.type) {
      case DELETE_EMPLOYEE_REQUEST:
      case UPDATE_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_EMPLOYEE_FAIL:
      case UPDATE_EMPLOYEE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_EMPLOYEE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case DELETE_EMPLOYEE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }