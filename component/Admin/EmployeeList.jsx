import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminEmployees,
  deleteEmployee,
} from "../../actions/employeeAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_EMPLOYEE_RESET } from "../../constants/employeeConstants";

function EmployeeList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const { error, employees, loading } = useSelector((state) => state.employees);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateEmployee
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Employee Deleted Successfully");
      dispatch({ type: DELETE_EMPLOYEE_RESET });
    }
    dispatch(getAdminEmployees());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);

  const deleteEmployeeHandler = (id) => {
    dispatch(deleteEmployee(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Employee ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "contactInfo",
      headerName: "Contact Info",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "salary",
      headerName: "Salary",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      minWidth: 200,
      headerClassName: "column-header1",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/admin/employee/${params.getValue(params.id, "id")}`}
              style={{ marginLeft: "1rem" }}
            >
              <EditIcon className="icon-" />
            </Link>

            <div
              onClick={() =>
                deleteEmployeeHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="iconbtn" />
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  employees &&
    employees.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        contactInfo: item.contactInfo,
        role: item.role,
        salary: item.salary,
      });
    });

  const exportToPdf = () => {
    const doc = new jsPDF();

    doc.text("Employee List Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Employee ID', 'Name', 'Contact Info', 'Role', 'Salary']],
      body: rows.map((row) => [row.id, row.name, row.contactInfo, row.role, row.salary]),
    });
    doc.save('employees.pdf');
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL EMPLOYEES - Admin`} />

          <div className="employee-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="employeeListContainer">
                <h4 id="employeeListHeading">ALL EMPLOYEES</h4>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={exportToPdf}
                  style={{ marginBottom: '20px' }}
                >
                  Generate Report
                </Button>

                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="employeeListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeList;