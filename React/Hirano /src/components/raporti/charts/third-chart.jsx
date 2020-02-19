import React, { Component } from "react";

import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

class ThirdChart extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data: this.props.data,
      avg_days: []
    }
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    let { avg_days } = this.state;
    avg_days=[];
    nextProps.data.forEach(element => {
        avg_days.push({
          avg: element.avg,
          id: 'CR' + element.id,
          count: element.count,
          days: 'Days'
        })
    });
    this.setState({
        data: [].concat(nextProps.data),
        avg_days
    })
  }

  stringToColour = (str)=> {
    str = str+str+str;
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
    const { avg_days } = this.state;
    return (
    <React.Fragment>
      {avg_days[0] &&
        <ResponsiveContainer width="99%">
          <PieChart width={730} height={250}>
            <Legend />
            <Tooltip />
            <Pie data={avg_days}  nameKey="id" dataKey="avg" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#1fbbb9" label>
            {
              avg_days.map((entry, index) => {
                return <Cell key={index} fill={this.stringToColour(entry.id)} />;
              })
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
