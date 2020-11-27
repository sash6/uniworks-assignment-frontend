import { Component } from "react";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import "./App.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import api from './api.service'
import Snackbar from "./Snackbar";
import { send } from './utils/Push'


export default class Form extends Component {
  constructor() {
    super();
  }
  state = {   
    isAllFieldsValid: false,
    dept: "",
    assignee: "",
    users: [],
    message: '',
    snackbarMsg: '',
    open: false
  };

  componentDidMount() {       
    console.log('localStorage.getItem::::', localStorage.getItem('loggedInUser'))
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name == 'dept') {
      axios
      .get(api.users+'/'+e.target.value+'?username='+localStorage.getItem('loggedInUser'))
      .then((response) => {        
        console.log("login response:::", response.data); 
        this.setState({open: false})  
        this.setState({users: response.data})         
      })
      .catch((e) => {
        this.setState({open: true, snackbarMsg: e.response.data})
        this.setState({users: []})
        console.log('e::::', e.response.data);                   
      });
    }

  };

  resetForm() {
    this.setState({assignee: '', message: '', dept: ''})
  }

  onSubmitForm = () => {   
    var data ={
      assignee: this.state.assignee,
      assigned: localStorage.getItem('loggedInUser'),
      department: this.state.dept,
      message: this.state.message,      
    }
    console.log('on submit form ......', data)
    axios
      .post(api.saveForm, data)
      .then((response) => {  
        send("Push Notifications", "You have got request for the Form Approval")      
        console.log("login response:::", response.data); 
        this.resetForm()
        this.setState({open: true, snackbarMsg: 'Form submitted successfully'})                 
      })
      .catch((e) => {
        this.setState({open: true, snackbarMsg: 'Something went wrong'})       
        console.log('e::::', e.response.data);                   
      });
  }

  render() {
    const { isAllFieldsValid, dept, assignee, users, open, message } = this.state;
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
    // const users = ["user1", "user2"];
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
          Form
        </div>
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
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {departments.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </div>
        <div>
          <FormControl required>
            <InputLabel id="demo-simple-select-label">Users</InputLabel>
            <Select
              style={{ marginBottom: "10px" }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              name="assignee"
              value={assignee}
              onChange={this.changeHandler}
              required
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {users.map((el) => (
                <MenuItem value={el.username}>{el.username}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </div>
        <div>
          <TextareaAutosize
            style={{width: '250px', height: '60px', marginBottom: '15px', marginTop: '15px'}}
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Message"
            name="message"
            value={message}
            onChange={this.changeHandler}
            defaultValue=""
          />
        </div>

        <div>
          <button
            style={
              (!dept || !assignee ) ? styles.loginDisableBtn : styles.loginEnableBtn
            }
            onClick={this.onSubmitForm}
            disabled={(!dept || !assignee )}
          >
            Submit
          </button>
        </div>

        <div>
          {open && <Snackbar key={new Date()} message={this.state.snackbarMsg} />}
        </div>

      </div>
    );
  }
}


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
  