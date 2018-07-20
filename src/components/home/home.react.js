import React, {Component} from 'react';
import './home.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as signalR from '@aspnet/signalr';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            items : [],
            status : false,
            count : '',
            cut: 'Ideal'
        };
            this.connection = new signalR.HubConnectionBuilder()
                    .withUrl("http://localhost/CuttingMachine/cuttinghub")
                    .build(); 
            this.connection.on("ReceiveOrderUpdate", (update) => {
                console.log(update);
                this.setState({status : update})
                if (this.state.status == "false") {
                    this.setState({
                        count: this.state.count + 1,
                        cut: 'Idle'
                    })                           
                } 
                else if(this.state.status == "true") {
                    this.setState({
                        cut: 'Cutting'
                    })
                }
    
            }); 
            this.connection.start()
            .catch(err => console.error(err.toString())); 
         
        
    }
    componentDidMount(){
        fetch("http://localhost/CuttingMachine/GetTodayDetails?fordate=2018-07-18")
           .then( (response) => {
                return response.json() })   
                .then((json) => {
                    this.setState({
                        items: json,
                        count: json.count
                    })
                    console.log(this.state.items);
                    return json;
     });
    }    
    callApiStart(){
        console.log("Start");
        fetch("http://localhost/CuttingMachine/api/StartTrack")
        .then((response)=> {
            return response
        })
        .then((res) => {
            console.log(res)            
            
        })               
    }
    callApiStop(){
        console.log("Stop");
        fetch("http://localhost/CuttingMachine/api/StopTrack")
        .then((response)=> {
            return response
        })
        .then((res) => {
            console.log(res)
            // this.connection.stop();
        })

    }

    render(){              
        return(
            <div style={{marginTop: '52px'}}>
                <div style={{float: 'left',width:'100%'}}>
                <div style={{ width: '100%' }}>
            <table className="table" >
            <thead>
                <tr>
                    <th>
                    </th>                    
                    <th>
                        Machine
                    </th>
                    <th>
                        No of Cuts
                    </th>
                    <th>
                        UserID
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td align="center">
                        <i className="fa fa-arrow-circle-up fa-2x" style={{fontSize: '20px', color: 'green'}}></i>
                    </td>
                    <td>
                        <Link to='/dashboard'>Machine 1</Link>
                    {/* <a href="http://localhost:3001/">Machine 1</a> */}
                    </td>
                    <td>                        
                        {this.state.count}
                    </td>
                    <td>
                        A242231
                    </td>
                </tr>
                <tr>
                <td align="center">
                        <i className="fa fa-arrow-circle-down fa-2x" style={{fontSize: '20px', color: 'red'}}></i>
                    </td>
                    <td>
                       Machine 2
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        A242230
                    </td>
                </tr>
                <tr>
                <td align="center">
                        <i className="fa fa-arrow-circle-down fa-2x" style={{fontSize: '20px', color: 'red'}}></i>
                    </td>
                    <td>
                        Machine 3
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        A222983
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
                </div>
            </div>
        );
    }
}

export default Home;

// const HomeTable = (props) => {
//     return(
        
//     )
// }