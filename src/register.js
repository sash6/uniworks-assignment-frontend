import { Component } from "react";
import axios from "axios";
import validator from "validator";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import "./App.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import api from "./api.service";
import Snackbar from "./Snackbar";

class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    dept: "",
    open: false,
    authenticationData: null,
    isAllFieldsValid: false,
    loading: false,
    message: null,
  };
  constructor() {
    super();
  }

  changeHandler = (e) => {
    this.setState({ open: false });
    this.setState({ [e.target.name]: e.target.value });
  };

  redirectToLogin = () => {
    this.props.history.replace({ pathname: "/" });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetFields() {
    this.setState({ email: "", dept: "", password: "", username: "" });
  }

  doRegister = (e) => {
    var data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      department: this.state.dept,
    };
    console.log("do login method....", data);
    axios
      .post(api.register, data)
      .then((response) => {
        this.setState({ open: true, message: "Registered Successfully" });
        this.resetFields();
        console.log("login response:::", response.data);
        localStorage.setItem("loggedInUserData", JSON.stringify(response.data));
        this.props.history.replace({
          pathname: "/home",
        });
      })
      .catch((e) => {
        this.setState({ open: true, message: "Something went wrong" });
        console.error(e);
      });
  };

  render() {
    const {
      username,
      email,
      password,
      isAllFieldsValid,
      dept,
      open,
    } = this.state;
    const departments = [
      "Production",
      "Finance",
      "R&D",
      "Purchasing",
      "Marketing",
      "HR",
      "Store",
      "Security",
      "Administration",
      "Quality",
    ];
    return (
      <div style={styles.mainDiv}>
        <div
          style={{
            fontWeight: "700",
            fontSize: "20px",
            marginBottom: "20px",
            color: "rgb(231, 73, 73)",
          }}
        >
          Sign up
        </div>
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-basic"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          // autoComplete="false"
          autocomplete="new-password"
          onChange={this.changeHandler}
          label="Username"
          required
        />
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-basic"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          // autoComplete="false"
          autocomplete="new-password"
          onChange={this.changeHandler}
          label="Email"
          required
        />
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-basic"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.changeHandler}
          label="Password"
          required
        />
        <div>
          <FormControl required>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              style={{ marginBottom: "10px" }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              name="dept"
              value={dept}
              onChange={this.changeHandler}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {departments.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </div>
        <div style={{ width: "270px", textAlign: "right" }}>
          <button style={styles.btn} onClick={this.redirectToLogin}>
            Login
          </button>
        </div>
        <div>
          <button
            style={
              !(validator.isEmail(email) && password && dept && username)
                ? styles.loginDisableBtn
                : styles.loginEnableBtn
            }
            onClick={this.doRegister}
            disabled={
              !(validator.isEmail(email) && password && dept && username)
            }
          >
            Register
          </button>
        </div>

        <div>
          {open && <Snackbar key={new Date()} message={this.state.message} />}
        </div>
      </div>
    );
  }
}

export default RegisterPage;

const styles = {
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "97vh",
    // background: "powderblue",
  },
  loginDisableBtn: {
    width: "120px",
    border: "none",
    height: "30px",
    background: "grey",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
    outline: "none",
  },

  errMsg: {
    fontSize: "15px",
    fontWeight: "600",
    color: "red",
    marginTop: "5px",
  },
  modalInputDiv: {
    marginBottom: 10,
  },
  loginEnableBtn: {
    width: "120px",
    border: "none",
    height: "30px",
    background: "rgb(231, 73, 73)",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
    outline: "none",
  },
  btn: {
    border: "none",
    background: "none",
    fontWeight: 600,
    outline: "none",
    fontSize: "11px",
    color: "blue",
    // padding:'0px 50px',
    cursor: "pointer",
    marginBottom: "10px",
    // textAlign: 'right'
  },
};
