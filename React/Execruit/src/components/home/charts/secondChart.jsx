import React, { Component } from "react";

import {
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";



class SecondChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    }
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    let { chartData } = this.state;
    chartData = [];
    nextProps.data.forEach(element => {
      chartData.push({
        name: element.name,
        value: element.value,
      })
    });
    this.setState({
      data: [].concat(nextProps.data),
      chartData
    })
  }


  render() {
    const { chartData} = this.state;
    return (
      <React.Fragment>
      {chartData[0] &&
      <ResponsiveContainer width="95%" height="95%">
        <BarChart  
          margin={{ top: 30, left: 15 }}  
          data={chartData} 
          dataKey="name"
        >
        <XAxis dataKey="name" />
          <YAxis dataKey="value"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip  cursor={{ fill: '#1fbbb9', fillOpacity: 1 }} dataKey='name'/>
          <Legend/>
          <Bar 
            dataKey="value" 
            fill="#d7d7d7" 
            barSize={100} 
          />
        </BarChart>
      </ResponsiveContainer>
      }
      </React.Fragment>
    );
  }
}

export default SecondChart;
