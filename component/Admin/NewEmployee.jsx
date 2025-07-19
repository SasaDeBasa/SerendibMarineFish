import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createEmployee, clearErrors } from "../../actions/employeeAction";
import { useHistory } from "react-router-dom";
import { NEW_EMPLOYEE_RESET } from "../../constants/employeeConstants";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Navbar from "./Navbar";
import useStyles from "../User/LoginFromStyle";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";

function NewEmployee() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.addNewEmployee);

  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const classes = useStyles();

  const roles = ["Export Manager", "Logistic Coordinator", "Marketing ", "Marine Biologist", "HR", "Maintenence"]; // Predefined roles

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Employee Created Successfully");
      history.push("/admin/employees");
      dispatch({ type: NEW_EMPLOYEE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createEmployeeSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("contactInfo", contactInfo);
    myForm.set("role", role);
    myForm.set("salary", salary);

    dispatch(createEmployee(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Employee"} />
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
                  onSubmit={createEmployeeSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <AddCircleOutlineIcon />
                  </Avatar>
                  <Typography variant="h5" className={classes.heading}>
                    Add Employee
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Employee Name"
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

                  <FormControl variant="outlined" fullWidth className={classes.textField}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Role"
                    >
                      {roles.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Salary"
                    required
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className={classes.textField}
                    style={{ textAlign: 'left' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AttachMoneyIcon style={{ fontSize: 20, color: "#414141" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    className={classes.loginButton}
                    disabled={loading}
                  >
                    Create
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

export default NewEmployee;