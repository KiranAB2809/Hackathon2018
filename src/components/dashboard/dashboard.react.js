import React, { Component } from 'react';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import Chart from 'chart.js';
import './dashboard.css';
import ReactDOM from 'react-dom';
import * as signalR from '@aspnet/signalr';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

class Dashboard extends Component{
    constructor(props){
        super(props) 
        this.state = {
        data: [],
        totalDetails: [],
        startDate:  moment(),
        weeklyDetails: []
     };         
     this.handleChange = this.handleChange.bind(this);		
     this.getAPi(moment(this.state.startDate).format("YYYY-MM-DD"));    
    }
    handleChange(date) {
     
        // alert("handle Change "+date);
            this.setState({
             startDate: date
         });
 
         this.getAPi(moment(date).format("YYYY-MM-DD"));
         //this.props.callbackFromParent(date);
       };
       getAPi(date)
    {
        debugger;
        // alert("api :"+date);
        // alert("datechange");
//         fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate="+date)
//            .then( (response) => {
//                 return response.json() })   
//                 .then((json) => {
//     console.log(json);
// console.log(json);
// // console.log(this.state.items);
//                     return json;
//      });

  fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate="+date)
                   .then( (response) => {
                        return response.json() })   
                        .then((json) => {
                            if(json!="False"){
                                this.setState({
                                    data: json,
                                    totalDetails: json.totalDetails,
                                    weeklyDetails: json.weeklyDetails                            
                                })
                            }   
                            else{
                                alert("No Data Available");
                            }                 
                            return json;
             }); 

    }
    componentDidMount(){ 
        // fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate=2018-07-18")
        //            .then( (response) => {
        //                 return response.json() })   
        //                 .then((json) => {
        //                     this.setState({
        //                         data: json,
        //                         totalDetails: json.totalDetails                              
        //                     })
        //                     // this.intiainitializeChart();
        //                     // console.log(this.state.data + "Inside Dashboard API call");
        //                     return json;
        //      }); 
        // var transport = HttpTransportType.signalR;
        // const connection = new HubConnection("http://10.235.33.246/CuttingMachine/cuttinghub",{transport : transport});
        // connection.on("ReceiveOrderUpdate", data => {
        //     console.log(data);
        // });
        // connection.start().catch(err => console.error(err, 'red'));

        // const connection = new signalR.HubConnectionBuilder()
        //     .withUrl("http://10.235.33.246/CuttingMachine/cuttinghub")
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();

        // connection.start().catch(err => console.error(err.toString()));

        // connection.on("ReceiveUpdate", (message) => {
        //     console.log(message);
        // })
        // const connect = new signalR.HubConnectionBuilder().withUrl("http://10.235.33.246/CuttingMachine/cuttinghub").build();
        // connect.on("ReceiveOrderUpdate", data => {
        //     console.log(data);
        // });
        // connect.start().then(() => connect.invoke() );
    }
    render(){ 
        return(
            <div style={{marginTop: '52px' }}>
            <Home />
            <div style={{marginLeft:'50px'}}>
                 <DatePicker    selected={this.state.startDate}  onChange ={this.handleChange}  />
            </div>
                <div style={{float: 'left', width: '47%'}}>  
                    <PartsOverview data = {this.state.data} />
                    <TimeLine data = {this.state.totalDetails} />                                     
                </div>
                <div style={{float: 'right', width: '47%', marginRight: '25px', right:'25px' }}>
                    <HourUpdate data = {this.state.weeklyDetails} />   
                    {/* <ChartHourUpdate /> */}
                </div>
            </div>
        )           
    }   
}

export default Dashboard;

const BufferOverview = (props) => {
    return(
        <div className="halfDiv dashboard-card" style={{padding:'15px'}}>
            <p className="card-header" style={{color: 'grey'}}>Cutting Overview</p>
            <div style={{width: '100%', overflow: 'hidden'}}>
                <div style={{marginTop: '22px', width: '30%', float: 'left'}}>
                    <p style={{fontSize: '15px'}}>
                        Total
                    </p>
                  {/* {  this.state && this.state.items && this.state.items.Count &&    
                    <p style={{fontSize: '4vw', color: 'slategrey', marginTop: '5px'}}>
                       this.state.items.Count
                    </p>
                } */}
                </div>
                <div style={{marginTop: '22px', width: '30%', float: 'left'}}>
                    <p style={{fontSize: '15px'}}>
                        Up-Time
                    </p>
                    <p style={{fontSize: '4vw', color: 'slategrey', marginTop: '5px'}}>
                        70
                    </p>
                </div>
                <div style={{marginTop: '22px', width: '30%', float: 'left'}}>
                    <p style={{fontSize: '15px'}}>
                        Down-Time
                    </p>
                    <p style={{fontSize: '4vw', color: 'slategrey', marginTop: '5px'}}>
                        30
                    </p>
                </div>
            </div>            
        </div>
    )
}

class TimeLine extends Component {
    constructor(){
        super();
        // this.state = {
        //     items : []
        // };
    }
    componentWillMount(){

    }
    componentDidMount(){
        // fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate=2018-07-13")
        // .then((result) => {
        //     return result.json()
        // })
        // .then((json) => {
        //     this.setState({
        //         items: json.totalDetails
        //     })  
        //     return json;  
        // });
    }
    render(){ 
        const propsData = this.props.data;  
        console.log("TimelIne");
        console.log(propsData);   
        return(
            <div className="halfDiv dashboard-card" style={{padding:'15px', maxHeight: '50%', overflow: 'hidden', overflowY: 'scroll'}}>
                <p className="card-header" style={{color: 'grey'}}>Cutting Events</p>
                <div style={{marginTop: '10px', backgroundColor:'#ededee', height:'500px', overflowY:'scroll' }}>                 
                    <Timeline>  
                    {propsData.map((element) =>{return ([
                        <TimelineEvent title="Cut Started" createdAt={element.startTime} icon={<i className="	fa fa-arrow-circle-up" style={{fontSize: '20px'}}></i>} iconColor="#6fba1c"></TimelineEvent>,
                        <TimelineEvent title="Cut Ended" createdAt={element.endTime} icon={<i className="	fa fa-arrow-circle-down" style={{fontSize: '20px'}}></i>} iconColor="#C25C46">Time Spent: {element.timeSpent} </TimelineEvent>
                    ])
                    })}                        
                    </Timeline>
                </div>
            </div>
        )
    }
}


//  const TimeLine = (props) => {
//     debugger;
//     console.log(props + "Inside Timeline");
//     if(props.totalDetails){
//     return(
//         <div className="halfDiv dashboard-card" style={{padding:'15px', maxHeight: '50%', overflow: 'hidden', overflowY: 'scroll'}}>
//             <p className="card-header" style={{color: 'grey'}}>Cutting Events</p>
//             <div style={{marginTop: '10px', backgroundColor:'#ededee'}}>
            
//             <Timeline>                
//                 {props.map((element) =>{return <TimelineEvent title="Cut start">Started At: {element.StartTime} , End Time: {element.EndTime}</TimelineEvent>})}
//             </Timeline>
//             </div>
           
//         </div>
//     )
// }
// }

class HourUpdate extends Component{
    constructor(){
        super(); 
        // this.state = {
        //     items : []
        // }                 
    }

    componentDidMount(){    
//         fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate="+moment().format("YYYY-MM-DD"))
//            .then( (response) => {
//                 return response.json() })   
//                 .then((json) => {
//                     this.setState({
//                         items: json.weeklyDetails
//                     })
//                     console.log("HourUpdate");
//                     console.log(this.state.items);
//                     this._intiainitializeChart(this.state.items);                    
//                     return json;
//      }); 
    }

    _intiainitializeChart(details){        
        Highcharts.getOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.chart('graph', {
            chart: {
                type: 'column',
                animation: Highcharts.svg,
                marginRight: 10                
            },
            title: {
                text: 'Weekly Update'
            },
            xAxis: {
                title : {
                    text: 'Days'
                },
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'No of Cuts'
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#808080'
                }]
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.createdDate}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.y}</span>Cuts<br/>'
              },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            "series": [
                {
                    "colorByPoint" : true,
                    "data": details
                }
            ]
        });
    }

    render(){   
        if(this.props.data.length != 0){
            this._intiainitializeChart(this.props.data);
        }               
        return(
            <div className="halfDiv dashboard-card" style={{padding:'15px', maxHeight: '50%', overflow: 'hidden', overflowY: 'scroll'}}>
                <p className="card-header" style={{color: 'grey'}}>Cutting Machine Events</p>
                <div style={{marginTop: '10px', backgroundColor:'#ededee'}} id="graph">

                </div>
            </div>
        )
    }
}


class ChartHourUpdate extends Component{
    constructor(){
        super();                          
    }

    componentDidMount(){
        this.intiainitializeChart();
    }

    intiainitializeChart(){
        Highcharts.getOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.chart('graph1', {
            chart: {
                type: 'column',
                animation: Highcharts.svg,
                marginRight: 10,
                events: {
                    load: function () {
                        var count = 0;
                        var series = this.series[0];                        
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 250
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
        
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
    }

    render(){        
        return(
            <div className="halfDiv dashboard-card" style={{padding:'15px', maxHeight: '50%', overflow: 'hidden', overflowY: 'scroll'}}>
                <p className="card-header" style={{color: 'grey'}}>Cutting Machine Events</p>
                <div style={{marginTop: '10px', backgroundColor:'#ededee'}} id="graph1">

                </div>
            </div>
        )
    }
}

class PartsOverview extends Component {    
    constructor(){
        super()       
        // this.state = {
        //     items : []
        // };
    }
    
    componentWillMount(){
        
    }
    componentDidMount(){        
//         fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate=2018-07-18")
//            .then( (response) => {
//                 return response.json() })   
//                 .then((json) => {
//                     this.setState({
//                         items: json
//                     })
//                     this.intiainitializeChart();
//                     // console.log(this.state.items);
//                     return json;
//      }); 
            
    }    

    intiainitializeChart(){
        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
            var ctx = chart.chart.ctx;
            var centerConfig = chart.config.options.elements.center;
              var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            ctx.font = "30px " + fontStyle;
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
    
            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);
    
            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight);
    
                    //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;
            
            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
                }
            }
        });
        var config1 = {
			type: 'doughnut',
			data: {
				datasets: [{
				//	data: [this.state.items.RunningTime/this.state.items.TotalSpentTime,this.state.items.IdealTime/this.state.items.TotalSpentTime],
                data: [this.props.data.runningTimePercent, this.props.data.idealTimePercent],
                backgroundColor: [
					  "green",
					  "#E3E3E3",					  
					]
				}]
			},
		options: {
            cutoutPercentage: 80,
            tooltips: false,
            responsive: true,
			elements: {
				center: {
					text: this.props.data.runningTimePercent + "/100",
                    sidePadding: 20,

				}
			}
		}
    };
    var config2 = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [75, 25],
//data: [3.6, 4.4],
                backgroundColor: [
                  "#23BA3A",
                  "#E3E3E3",					  
                ]
            }]
        },
    options: {
        cutoutPercentage: 80,
        tooltips: false,
        responsive: true,
        elements: {
            center: {
                text: '75/100',
                sidePadding: 20,

            }
        }
    }
};
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, config1);
    }

    render(){
        console.log("Parts Comp render");
        console.log(this.props.data);  
        if(this.props.data.length != 0){
            this.intiainitializeChart();
        }  

        return(            
            <div className="halfDiv dashboard-card" style={{padding:'15px'}}>
                <p className="card-header" style={{color: 'grey'}}>Cutting Overview</p>
                <div style={{marginTop: '22px'}}>
                    <div style={{width: '30%', height: '20%', float: 'left'}}>
                        <canvas id="myChart" style={{width: '100%', height: '100%'}}>
                        </canvas>                
                    </div>
                </div>
                <div style={{float:'left'}}>
                <table className="table" >
                <tbody>
                    <tr>
                        <td><i className="fa fa-arrow-circle-up fa-2x" style={{fontSize: '20px', color: 'green'}}></i></td>
                        <td>Up-Time</td>
                        <td>
                            {this.props.data.runningTime}                      
                        </td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-arrow-circle-down fa-2x" style={{fontSize: '20px', color: 'red'}}></i></td>
                        <td>Down-Time</td>
                        <td>{this.props.data.idealTime}</td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-cog fa-2x" style={{fontSize: '20px', color: 'blue'}}></i></td>
                        <td>Cut Count</td>
                        <td>{this.props.data.count}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
        );        
    }
}

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            items : [],
            status : false,
            count : '',
            cut: 'Ideal'
        };
            // this.connection = new signalR.HubConnectionBuilder()
            //         .withUrl("http://localhost/CuttingMachine/cuttinghub")
            //         .build(); 
            // this.connection.on("ReceiveOrderUpdate", (update) => {
            //     console.log(update);
            //     this.setState({status : update})
            //     if (this.state.status == "false") {
            //         this.setState({
            //             count: this.state.count + 1,
            //             cut: 'Ideal'
            //         })                           
            //     } 
            //     else if(this.state.status == "true") {
            //         this.setState({
            //             cut: 'Cutting'
            //         })
            //     }
    
            // }); 
            // this.connection.start()
            // .catch(err => console.error(err.toString())); 
         
        
    }
    componentDidMount(){
        fetch("http://10.235.33.246/CuttingMachine/GetTodayDetails?fordate="+moment().format("YYYY-MM-DD"))
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
    // callApiStart(){
    //     console.log("Start");
    //     fetch("http://localhost/CuttingMachine/api/StartTrack")
    //     .then((response)=> {
    //         return response
    //     })
    //     .then((res) => {
    //         console.log(res)            
            
    //     })               
    // }
    // callApiStop(){
    //     console.log("Stop");
    //     fetch("http://localhost/CuttingMachine/api/StopTrack")
    //     .then((response)=> {
    //         return response
    //     })
    //     .then((res) => {
    //         console.log(res)
    //         // this.connection.stop();
    //     })

    // }

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
                    <th>
                        Cut Status
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td align="center">
                        <i className="fa fa-arrow-circle-up fa-2x" style={{fontSize: '20px', color: 'green'}}></i>
                    </td>
                    <td>
                        Machine 1
                    {/* <a href="http://localhost:3001/">Machine 1</a> */}
                    </td>
                    <td>                        
                        {this.state.count}
                    </td>
                    <td>
                        A242231
                    </td>
                    <td>
                        <div className="cutStatus">{this.state.cut}</div>
                    </td>
                    <td>
                        <button className=" btn1 btn btn-primary" type="button" id="start" name="start" onClick={this.callApiStart}>Start</button>
                    <   button className=" btn1 btn btn-danger" type="button" id="end" name="end" onClick={this.callApiStop}>Stop</button>
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