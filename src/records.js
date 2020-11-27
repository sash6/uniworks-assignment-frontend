import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from './api.service'
import axios from "axios";
import Snackbar from "./Snackbar";

export default class Records extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    data: [],
    status: null,
    open: false
  }

  componentWillReceiveProps(props) {    
    this.setState({ data: props.data, status: props.status })
  }

  getRequestApprovedRecords() {
    axios
      .get(api.requests + '/request_approval?user=' + localStorage.getItem('loggedInUser'))
      .then((response) => {
        this.setState({ data: response.data })
        console.log(" response:::", response.data);
      })
      .catch((e) => {
        console.log('e::::', e.response.data);
      });
  }

  onApprovalBtnClick = (id) => {
    axios
      .post(api.statusUpdate + '/' + id)
      .then((response) => {
        this.setState({ open: true});
        this.getRequestApprovedRecords()
        console.log(" response:::", response.data);
      })
      .catch((e) => {
        this.setState({ open: false});
        console.log('e::::', e.response.data);
      });
  }

  render() {
    const { status, open } = this.state
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Message</TableCell>
                {
                  status == 'request_approval' ?
                    <TableCell>Status</TableCell> :
                    <TableCell>Assignee</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  {
                    status == 'request_approval' ?
                      <TableCell>
                        <button style={{ background: 'green', color: 'white', border: 'none', height: '25px', borderRadius: '5px' }} onClick={() => this.onApprovalBtnClick(row._id)}>
                          Approve
                      </button>
                      </TableCell> :
                      <TableCell>{row.assignee}</TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          {open && <Snackbar key={new Date()} message='Approved Successfully' />}
        </div>
      </div>
    );
  }
}