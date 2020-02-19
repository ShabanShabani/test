import React, { Component } from "react";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

class SecondChart extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
        data: [
          {
            name: "Rafta te lire",
            value: this.props.free
          },
          {
            name: "Rafta te mbjellura",
            value: this.props.not_free
          }
        ]
      }
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: [
        {
          name: "Rafta te lire",
          value: nextProps.free
        },
        {
          name: "Rafta te mbjellura",
          value: nextProps.not_free
        }
      ]
    })
  }

  render() {
    const { data } = this.state;
    return (
      <ResponsiveContainer width="99%">
        <PieChart width={730} height={250}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#1fbbb9" label>
            <Cell fill='#00CCFF' />
            <Cell fill='#E63946' />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default SecondChart;
