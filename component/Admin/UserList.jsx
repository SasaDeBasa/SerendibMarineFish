import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MataData/MataData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import Loader from "../layouts/loader/Loader";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstanat";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UserList() {
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profileData
  );
  const alert = useAlert();
  const history = useHistory();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const [toggle, setToggle] = useState(false);
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
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  // Datagrid values and schema
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 100,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => (
        <img
          src={params.getValue(params.id, "avatar")}
          alt="User Avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.7,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon className="icon-" />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="iconbtn" />
            </Button>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
      sortable: false,
      headerClassName: "column-header hide-on-mobile",
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        avatar: item.avatar.url, // Include avatar URL
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  // Report generation function
  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Customer List Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Customer ID', 'Name', 'Email', 'Role']],
      body: rows.map((row) => [
        row.id,
        row.name,
        row.email,
        row.role,
      ]),
    });

    doc.save('customers.pdf');
  };

  // Toggle handler
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // Close the sidebar when the screen size is greater than 1000px
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
          <MetaData title={`ALL Users - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">ALL CUSTOMERS</h4>

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
                  className="productListTable"
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

export default UserList;
