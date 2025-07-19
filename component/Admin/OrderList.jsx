import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import jsPDF from "jspdf"; // Import jsPDF
import autoTable from "jspdf-autotable"; // Import autoTable

function OrderList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateOrder
  );
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
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

  // dispatching the action
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
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert, isDeleted, deleteError]);

  // delet order handler
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  // DATA GRID VALUE
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 120,
      flex: 0.7,
      headerClassName: "column-header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => {
        const color = params.value === "Delivered" ? "green" : "red";
        return <div style={{ color, fontWeight: 600 }}>{params.value}</div>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      minWidth: 150,
      headerClassName: "column-header1",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon className="icon-" />
            </Link>
            <Link
              onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon className="iconbtn" />
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  // Function to generate the PDF
  const exportToPdf = () => {
    const doc = new jsPDF();

    // Add the title at the top of the PDF
    doc.text("Order List Report", 14, 20); // Title for the PDF

    // Create the table
    autoTable(doc, {
      startY: 30, // Ensures the table starts after the title
      head: [["Order ID", "Items Qty", "Amount", "Status"]],
      body: rows.map((row) => [row.id, row.itemsQty, row.amount, row.status]),
    });

    // Save the PDF
    doc.save("orders.pdf");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Orders - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">ALL ORDERS</h4>

                {/* Button to export the table to PDF */}
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

export default OrderList;
