import React, { Component } from 'react';

class DangerPopup extends Component {
    constructor(props){
        super(props)
        this.state={
            none: true,
            liveData:this.props.liveData
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            liveData:nextProps.liveData
        })
    }

    displayNone = () => {
        this.setState({
            none: !this.state.none
        })
    }
    render(){
        const {liveData, none}=this.state;
        const { top, left, otherTop, otherLeft, index, id, type } = this.props;
        return(
            <React.Fragment>
                {liveData &&
                    <div id={id}>
                        <div id="danger" style={{top: top+'%', left: left+'%'}} className={`danger small-box active ${liveData.alert ? '' : 'display-none'}`}>
                            <div className="little-circle"></div>
                        </div>
                        <div id={index} style={{top: otherTop+'%', left: otherLeft+'%'}} onClick={this.displayNone} className={`danger big-box active ${(liveData.alert && none) ? '' : 'display-none'}`}>
                            {type === "cultivation" &&
                                <span className="title">Sera e kultivimit {id}</span>
                            }
                            {type === "growing" &&
                                <span className="title">Sera e rritjes {id}</span>
                            }
                            <div className="inside-big-box">
                                <div className="inside-wrapper">
                                    <div className="circle">
                                        <img src="./assets/img/weather-white.png" alt="" />
                                    </div>
                                    <span className="content">{liveData.temperature}</span>
                                </div>
                                <div className="inside-wrapper">
                                    <div className="circle">
                                        <img src="./assets/img/weather-white.png" alt="" />
                                    </div>
                                    <span className="content">{liveData.humidity}</span>
                                </div>
                                {/* <div className="inside-wrapper">
                                    <div className="circle">
                                        <img src="./assets/img/weather-white.png" alt="" />
                                    </div>
                                    <span className="content">18C</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default DangerPopup;