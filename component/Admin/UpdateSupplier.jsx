import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { updateSupplier, getSupplierDetails, clearErrors } from "../../actions/supplierAction";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_SUPPLIER_RESET } from "../../constants/supplierConstants";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import Navbar from "./Navbar";
import useStyles from "../User/LoginFromStyle";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core"; // Import necessary MUI components

function UpdateSupplier() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); // Getting supplier id from the URL
  const alert = useAlert();

  const { loading, error, supplier } = useSelector((state) => state.supplierDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateSupplier
  );

  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const classes = useStyles();

  const categories = ["Small Fish", "Large Fish", "Invertebrates", "Rays", "Sharks","Anemones"]; // Predefined categories

  useEffect(() => {
    if (supplier && supplier._id !== id) {
      dispatch(getSupplierDetails(id)); // Fetch the details if they don't match the current supplier
    } else {
      setName(supplier.name);
      setContactInfo(supplier.contactInfo);
      setAddress(supplier.address);
      setCategory(supplier.category);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Supplier Updated Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: UPDATE_SUPPLIER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, id, supplier, updateError]);

  const updateSupplierSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("contactInfo", contactInfo);
    myForm.set("address", address);
    myForm.set("category", category); // Updating the selected category

    dispatch(updateSupplier(id, myForm)); // Updating supplier by ID
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Update Supplier"} />
          <div className={classes.updateProduct}>
            <div className={classes.firstBox1}>
              <Sidebar />
            </div>

            <div className={classes.secondBox1}>
              <div className={classes.navBar1}>
                <Navbar />
              </div>

              <div className={classes.formContainer}>
                <form
                  className={classes.form}
                  encType="multipart/form-data"
                  onSubmit={updateSupplierSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <AddCircleOutlineIcon />
                  </Avatar>
                  <Typography variant="h5" className={classes.heading}>
                    Update Supplier
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Supplier Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon style={{ fontSize: 20, color: "#414141" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Contact Information"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ContactPhoneIcon style={{ fontSize: 20, color: "#414141" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationOnIcon style={{ fontSize: 20, color: "#414141" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Category Selection as Dropdown */}
                  <FormControl variant="outlined" fullWidth className={classes.textField}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)} // Handle category selection
                      label="Category"
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    className={classes.loginButton}
                    disabled={updateLoading}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateSupplier;
