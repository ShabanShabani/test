import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar'
import Grid from './grid'
import List from './list'
import Filter from './filter'
import { Animated } from "react-animated-css";

class Favorites extends Component {
    state = {
        isActive: false,
        isToggleOn: false,
        isFilterOn: false,
        isToggleList: 'grid'
    }

    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    toggleList = (toggle) => {
        this.setState({
            isToggleList: toggle
        });
    };

    toggleFilter = () => {
        this.setState({
            isFilterOn: !this.state.isFilterOn
        });
    };

    render() {
        const { isToggleOn, isToggleList, isFilterOn } = this.state;
        return (
            <React.Fragment>
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                />
                <div className={`favorites ${isToggleOn ? '' : 'active'}`}>
                    {/* <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}> */}
                    <Filter
                        toggleList={this.toggleList}
                        isToggleList={isToggleList}
                        toggleFilter={this.toggleFilter}
                        isFilterOn={isFilterOn}
                    />
                    {/* </Animated> */}
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Grid toggleList={this.toggleList} isToggleList={isToggleList} />
                    </Animated>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <List toggleList={this.toggleList} isToggleList={isToggleList} />
                    </Animated>
                </div>
            </React.Fragment>
        );
    }
}

export default Favorites;