import React, { Component } from 'react';

class InfoPopup extends Component {
    constructor(props){
        super(props)
        this.state={
            hover: false,
            liveData:this.props.liveData,
            x: 0,
            y: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            liveData:nextProps.liveData
        })
    }

    removeClass = () => {
        this.setState({
            hover: false
        })
    }

    onMouseMove(e) {
        this.setState({ 
            x: e.nativeEvent.offsetX, 
            y: e.nativeEvent.offsetY,
            hover: true
        });
    }

    render(){
        const {hover, liveData, x, y} = this.state;
        const { top, left, index, id, type, spanTop, spanLeft, spanRotate, avg_day, stock_alert } = this.props;
        return(
            <React.Fragment>
                {liveData &&
                    <React.Fragment>
                        <div className={`green-name`} style={{position: 'absolute', top: spanTop+'%', left: spanLeft+'%', transform: `rotate(${spanRotate}deg)`  }} >
                            {type === "cultivation" &&
                                <span className="title">CR{id}</span>
                            }
                            {type === "growing" &&
                                <span className="title">GR{id} </span>
                            }
                            {type === "fridge" &&
                            <span className="title">{liveData.description}</span>
                            }
                        </div>
                        <div id={id} style={{position: 'absolute', top: top+'%', left: left+'%'}} >
                            <div onMouseMove={this.onMouseMove.bind(this)} onMouseLeave={this.removeClass} style={{}} id="normal" className={`small-box info-box ${index} ${!liveData.alert ? 'normal' : ''}`}>
                                <div style={{zIndex: -1}} className={`little-circle ${liveData.alert || (type === 'stock' && stock_alert.length > 0) ? 'danger' : ''}`}></div>
                            </div>
                            <div id={index} style={{top: x, left: y, transform: `translateX(10%) translateY(-50%)`, zIndex: '9999'}} className={`big-box ${hover ? 'active' : ''}  ${liveData.alert}`}>
                            {/* <div id={index} style={{top: otherTop+'%', left: otherLeft+'%'}} className={`big-box ${hover ? 'active' : ''} ${liveData.alert}`}> */}
                                {type === "cultivation" &&
                                    <span className="title">CR{id}</span>
                                }
                                {type === "growing" &&
                                    <span className="title">GR{id} </span>
                                }
                                {type === "fridge" &&
                                    <span className="title">{liveData.description}</span>
                                }
                                {/* {type === "fridge" &&
                                    <span className="title">{liveData.description}</span>
                                } */}
                                {(type === 'cultivation' || type === 'fridge' || type === 'growing') ?
                                    <div className="inside-big-box">
                                        <div className="inside-wrapper">
                                            <div className={`circle  ${(liveData.alert.includes('temp_low')||liveData.alert.includes('temp_high')) ? 'temperature' : ''}`}>
                                                <img src="./assets/img/thermometer.svg" alt="" />
                                            </div>
                                            <span className="contact">{liveData.temperature}</span>
                                        </div>
                                        <div className="inside-wrapper">
                                            <div className={`circle  ${(liveData.alert.includes('hum_low')||liveData.alert.includes('hum_high')) ? 'humidity' : ''}`}>
                                                <img src="./assets/img/humidity.svg" alt="" />
                                            </div>
                                            <span className="contact">{liveData.humidity}</span>
                                        </div>
                                        <div className="inside-wrapper">
                                            {/* <div className={`circle  ${liveData.alert.includes('humidity') ? 'humidity' : ''}`}> */}
                                            <div className={`circle `}>
                                                <img src="./assets/img/appointment.svg" alt="" />
                                            </div>
                                            {avg_day ?
                                                <span className="contact">{avg_day.avg.toFixed(2)}D</span>
                                                :
                                                <span className="contact">50D</span>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className={`stock-alert`}>
                                        {stock_alert[0] ?
                                            stock_alert.map((element, index) =>
                                                <div className={`alert-stock`}>
                                                    <span>{element.name}: </span>
                                                    <span>{element.quantity - element.limit}</span>
                                                </div>
                                            )
                                            :
                                            <span>Stoku eshte ne regull</span>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default InfoPopup;