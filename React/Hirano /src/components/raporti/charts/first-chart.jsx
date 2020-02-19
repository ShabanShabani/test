import React, { Component } from "react";
import {LabelList, XAxis, BarChart, Legend, Bar, ResponsiveContainer, Tooltip, YAxis, Cell } from "recharts";

// const data = [
//   {
//     name: "Mini Arka",
//     pv: 2400,
//   },
//   {
//     name: "Arka te Vogla",
//     pv: 1398,
//   },
//   {
//     name: "Arka te Mesme A",
//     pv: 9800,
//   },
//   {
//     name: "Arka te Mesme B",
//     pv: 3908,
//   },
//   {
//     name: "Arka te Medha A",
//     pv: 4800,
//   },
//   {
//     name: "Arka te Medha B",
//     pv: 3800,
//   },
//   {
//     name: "Klasa C",
//     pv: 4300
//   },
//   {
//     name: "Te Thata",
//     pv: 4300
//   },
//   {
//     name: "Mix",
//     pv: 4300
//   },
//   {
//     name: "Bishta",
//     pv: 4300
//   },
//   {
//     name: "Tjera",
//     pv: 4300
//   }
// ];

class FirstChart extends Component {
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
          sasia: element.quantity + ` ${element.unit}`,
          Sasia: element.quantity,
          amt: element.unit
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
          <ResponsiveContainer width="95%" height="95%">
            <BarChart margin={{ top: 30, left: 15 }} data={chartData}>
              <XAxis dataKey={`name`} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='Sasia' fill="#000" barSize={25}>
                <LabelList dataKey="sasia" position="top" />
              {
                chartData.map((entry, index) => 
                  <Cell fill={this.stringToColour(entry.name)} />
                )
              }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        }
      </React.Fragment>
    );
  }
}

export default FirstChart;
