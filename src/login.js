import { Component } from "react";
import axios from "axios";
import validator from "validator";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import "./App.css";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import api from './api.service'
import Snackbar from "./Snackbar";
import HomePage from './home'

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    dept: "",
    open: false,
    authenticationData: null,
    isAllFieldsValid: false,
    loading: false,
  };
  constructor(props) {
    super(props);
  }

  changeHandler = (e) => {
    this.setState({ open: false });
    this.setState(
      { [e.target.name]: e.target.value }
    );
  };

  redirectToRegister = () => {
    this.props.history.replace({
      pathname: '/register',
      // pathname: '/main',
    })
  }

  doLogin = (e) => {
    var data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(api.login, data)
      .then((response) => {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("loggedInUser", response.data.username);
        this.setState({ open: true, message: 'LoggedIn Successfully' });
        this.props.history.replace({
          pathname: "/home",
        });
      })
      .catch((e) => {
        console.log('e::::', e.response.data);
        this.setState({ open: true, message: e.response.data });
      });
  };

  render() {
    const { email, password, open } = this.state;
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
          Login
        </div>
        <TextField
          style={{ marginBottom: '10px' }}
          id="standard-basic"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          autoComplete="false"
          onChange={this.changeHandler}
          label="Email"
          required
        />
        <TextField
          style={{ marginBottom: '10px' }}
          id="standard-basic"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.changeHandler}
          label="Password"
          required
        />
        <div style={{ width: "270px", textAlign: "right" }}>
          <button style={styles.btn} onClick={this.redirectToRegister}>
            Register
          </button>
        </div>
        <div>
          <button
            style={
              !(validator.isEmail(email) && password) ? styles.loginDisableBtn : styles.loginEnableBtn
            }
            onClick={this.doLogin}
            disabled={!(validator.isEmail(email) && password)}
          >
            Login
          </button>
        </div>
        <div>
          {open && <Snackbar key={new Date()} message={this.state.message} />}
        </div>
      </div>
    );
  }
}

export default LoginPage;

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
