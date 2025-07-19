import React, { useState, useEffect } from "react";
import "./SupplierList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminSuppliers,
  deleteSupplier,
} from "../../actions/supplierAction";
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
import { DELETE_SUPPLIER_RESET } from "../../constants/supplierConstants";

function SupplierList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const { error, suppliers, loading } = useSelector((state) => state.suppliers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateSupplier
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
      alert.success("Supplier Deleted Successfully");
      dispatch({ type: DELETE_SUPPLIER_RESET });
    }
    dispatch(getAdminSuppliers());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);

  const deleteSupplierHandler = (id) => {
    dispatch(deleteSupplier(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Supplier ID",
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
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 250,
      flex: 0.7,
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
              to={`/admin/supplier/${params.getValue(params.id, "id")}`}
              style={{ marginLeft: "1rem" }}
            >
              <EditIcon className="icon-" />
            </Link>

            <div
              onClick={() =>
                deleteSupplierHandler(params.getValue(params.id, "id"))
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

  suppliers &&
    suppliers.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        contactInfo: item.contactInfo,
        category: item.category,
        address: item.address, // Adding address to rows
      });
    });

  const exportToPdf = () => {
    const doc = new jsPDF();

    doc.text("Supplier List Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Supplier ID', 'Name', 'Contact Info', 'Category', 'Address']], // Add Address to PDF table
      body: rows.map((row) => [row.id, row.name, row.contactInfo, row.category, row.address]),
    });
    doc.save('suppliers.pdf');
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
          <MetaData title={`ALL SUPPLIERS - Admin`} />

          <div className="supplier-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="supplierListContainer">
                <h4 id="supplierListHeading">ALL SUPPLIERS</h4>

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
                  className="supplierListTable"
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

export default SupplierList;
