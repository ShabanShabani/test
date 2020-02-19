import React, { Component } from "react";
import {LabelList, PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

class SecondChart extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
          data: this.props.data,
          chartData: []
      }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { chartData } = this.state;
    chartData=[];
    nextProps.data.forEach(element => {
        chartData.push({
          name: element.name,
          value: element.quantity
        })
    });
    this.setState({
        data: [].concat(nextProps.data),
        chartData
    })
  }

  stringToColour = (str)=> {
    var hash = 9999;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var j = 0; j < 3; j++) {
      var value = (hash >> (j * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  render() {
    const { chartData } = this.state;
    return (
        <React.Fragment>
          {chartData[0] &&
            <ResponsiveContainer width="99%">
              <PieChart width={730} height={250}>
                <Tooltip />
                <Legend />
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#1fbbb9" label>
                  <LabelList dataKey="sasia" position="top" />
                  {
                    chartData.map((entry, index) => 
                      <Cell fill={this.stringToColour(entry.name)}/>
                    )
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          }
        </React.Fragment>
    );
  }
}

export default SecondChart;
