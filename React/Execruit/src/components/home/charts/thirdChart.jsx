import React, { Component } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell
} from "recharts";



class ThirdChart extends Component {
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

  stringToColour = (str) => {
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
    const label = 'aaaaa'
    const { chartData } = this.state;
    return (
      <React.Fragment>
        {chartData[0] &&
          <ResponsiveContainer width="99%">
            <PieChart width={750} height={250}>
              <Tooltip />
              <Legend />
              <Pie data={chartData} label={label} dataKey='value' nameKey='name' cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#033275" >
                {
                  chartData.map((entry, index) =>
                    <Cell key={index} fill={this.stringToColour(entry.name)} />
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

export default ThirdChart;


