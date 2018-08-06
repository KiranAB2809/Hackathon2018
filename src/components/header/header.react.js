import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {CSVLink} from 'react-csv';
import './header.css';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    
    componentDidMount(){
        // fetch("http://10.235.33.246/cuttingmachine/GetMonthlyDetails?forMonth=2018-07")
        // .then((response) => {
        //     return response.json()             
        // })
        // .then((json) => {
        //     this.setState({
        //         data: json.dailyDetails
        //     })
        //     return json;
        // })
    }
    render(){
        return(
            <div className="header" id="header">
                <Link to="/" className="header-brand">Cutting Machine Tracker</Link>
                {/* <input type="date" className="dateInput" /> */}
                {/* <CSVLink data={this.state.data} filename={"MonthlyReport.csv"} className="btn btn-warning" >Monthly Report</CSVLink> */}
            </div>
        );
    }
}

export default Header;