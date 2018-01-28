import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var rd3 = require('recharts');

export default class Total extends Component{
  const totalChart = React.createClass({
	render () {

    var cdata = this.props.data
  	return (

      var data = [
      {name: 'Games played', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Free throws made', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Three points made', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Total rebounds', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Total Assists', uv: 1890, pv: 4800, amt: 2181},
      ];


    	<BarChart width={600} height={300} data={cdata}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
       <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
})

}
