import { Component } from "react";
import api from './api.service'
import axios from "axios";

export default class RecordsList extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        axios
        .get(api.requests+'/pending')
        .then((response) => {              
          console.log(" response:::", response.data);          
        })
        .catch((e) => {
          console.log('e::::', e.response.data);                 
        });
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}