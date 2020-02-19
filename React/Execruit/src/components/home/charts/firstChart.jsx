import React, { Component } from "react";
import {
  AreaChart,
  Tooltip,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

class FirstChart extends Component {
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
        quantity: element.value,
      })
    });
    this.setState({
      data: [].concat(nextProps.data),
      chartData
    })
  }




  render() {
    const { chartData } = this.state;
    return (
      <React.Fragment>
        {chartData[0] &&
          <ResponsiveContainer width="95%">
            <AreaChart
              width={800}
              height={300}
              data={chartData}
              margin={{ top: 30, right: 30, left: 50, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip dataKey='name' />
              {/* <ReferenceLine
                  color="red"
                  x="Page C"
                  stroke="yellow"
                  label="Min PAGE"
                /> */}
              {/* <ReferenceLine
                  y={4000}
                  label="Max"
                  stroke="red"
                  strokeDasharray="3 3"
                /> */}
              <Area
                type="monotone"
                dataKey="quantity"
                stroke="#003275"
                fill="#003275"
                strokeWidth="4"
                activeDot={{ stroke: '#003275', strokeWidth: 2, r: 8, }}
              />
            </AreaChart>
          </ResponsiveContainer>
        }
      </React.Fragment>
    );
  }
}

export default FirstChart;
