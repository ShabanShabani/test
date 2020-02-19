import React, { Component } from "react";
import LeftMenu from "../left-menu/left-menu";
import NavBar from "../nav-bar/nav-bar";
import FirstChart from "./charts/firstChart";
import SecondChart from "./charts/secondChart";
import ThirdChart from "./charts/thirdChart";
import FourthChart from "./charts/fourthChart";
import chartsService from '../../services/chartsService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isActive: false,
      isToggleOn: true,
      isFilterOn: false,
      isToggleList: 'list',
      isToggleOnMobile: true,
      value: '',
      data: [],
      thirdChartData: [],
      secondChartData: []
    };
  }

  toggleFavorites = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  toggleLeftMenu = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  };

  toggleLeftMenuMobile = () => {
    this.setState({
      isToggleOnMobile: !this.state.isToggleOnMobile
    });
  };

  componentDidMount() {
    let { data, thirdChartData,secondChartData } = this.state;
    chartsService.getFirstChart().then(({ data: response }) => {
      data = [].concat(response);
      this.setState({
        data
      })
    }).catch(err => {
      this.setState({
        loading: false
      })
    })
    chartsService.getSecondChart().then(({ data: response }) => {
      secondChartData = [].concat(response);
      this.setState({
        secondChartData
      })
    }).catch(err => {
      this.setState({
        loading: false
      })
    })
    chartsService.getThirdChart().then(({ data: response }) => {
      thirdChartData = [].concat(response);
      this.setState({
        thirdChartData
      })
    }).catch(err => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { isActive, isToggleOn, isToggleOnMobile, data, thirdChartData,secondChartData } = this.state;
    return (
      <React.Fragment>
        <NavBar
          toggleLeftMenu={this.toggleLeftMenu}
          isToggleOn={isToggleOn}
        />
        <LeftMenu
          toggleLeftMenu={this.toggleLeftMenu}
          isToggleOn={isToggleOn}
          toggleLeftMenuMobile={this.toggleLeftMenuMobile}
          isToggleOnMobile={isToggleOnMobile}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="container">
              <div className={`home ${isToggleOn ? "" : "active"}`}>
                <div className={`first-chart chart ${isActive ? "hide" : ""}`}>
                  <FirstChart
                    data={data}
                  />
                </div>
                <div className={`third-chart chart ${isActive ? "hide" : ""}`}>
                  {" "}
                  <ThirdChart
                    data={thirdChartData}
                  />
                </div>
                {/* <FavoriteUsers
                  isActive={isActive}
                  toggleFavorites={this.toggleFavorites}
                /> */}
                <div className={`second-chart chart ${isActive ? "hide" : ""}`}>
                  {" "}
                  <SecondChart 
                    data={secondChartData}
                  />{" "}
                </div>

                <div className={`fourth-chart chart ${isActive ? "hide" : ""}`}>
                  <FourthChart
                    data={thirdChartData}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
