import React, { Component } from "react";
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LoginPage from "./login";
import api from './api.service'
import axios from "axios";
import Form from './form'
import Records from './records'
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MenuIcon from '@material-ui/icons/Menu';

export default class HomePage extends Component {
  constructor() {
    super();
  }

  state = {
    data: [],
    form: true,
    status: null
    // records: false
  }

  showPage = (url) => {
    // this.props.history.push('/'+url)
    if (url == 'form') {
      this.setState({ form: true })
    } else {
      this.setState({ form: false, status: url })
      axios
        .get(api.requests + '/' + url + '?user=' + localStorage.getItem('loggedInUser'))
        .then((response) => {
          this.setState({ data: response.data })
          console.log(" response:::", response.data);
        })
        .catch((e) => {
          console.log('e::::', e.response.data);
        });
    }
  }

  onLogout = () =>{
    // this.props.history.replace('/')
    localStorage.clear()
    console.log('props here::::', this.props)
    this.props.history.replace({
      pathname: '/'
    });
  }

  render() {
    const { form, records } = this.state
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div style={{display: 'flex', flex: 1,justifyContent: 'space-between'}}>
              <div>
                <Button color="inherit" onClick={() => this.showPage('form')}>Form</Button>
                <Button color="inherit" onClick={() => this.showPage('pending')}>Pending</Button>
                <Button color="inherit" onClick={() => this.showPage('approved')}>Approved</Button>
                <Button color="inherit" onClick={() => this.showPage('request_approval')}>Request for Approval</Button>
              </div>
              <div>
                {/* <Button color="inherit" onClick={() => this.showPage('notification')}>Notification</Button> */}
                <NotificationsIcon/>
                <Button color="inherit" onClick={this.onLogout}>Logout</Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {form && <Form {...this.props} />}
        { !form && <Records data={this.state.data} status={this.state.status} {...this.props} />}
      </div>
    );
  }
}

