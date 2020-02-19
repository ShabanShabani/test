import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import Shelf from './shelf';
import plantService from '../../services/plantService'
import * as toast from '../../all/toast'

class House extends Component {
    constructor(props){
        super(props);
        this.state = {
            shelf: [],
            temperatures:{},
            toggleLang: 'toggle'
        }
    }

    componentDidMount() {
        document.body.classList.add('green-wrapper');
        if(this.props.location.state.type === 'green-house')
        {
            plantService.getShelf( this.props.location.state.id ).then(({ data: response }) => {
                this.setState({
                    temperatures:response.temperatures,
                    shelf: [].concat(response.shelf),
                    loading: false
                })
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }else{
            plantService.getShelfGrowing( this.props.location.state.id ).then(({ data: response }) => {
                this.setState({
                    temperatures:response.temperatures,
                    shelf: [].concat(response.shelf),
                    loading: false
                })
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }
    }
    componentWillUnmount()
    {
        document.body.classList.remove('green-wrapper');        
    }

    render() {
        const { shelf, temperatures, toggleLang } = this.state;
        return ( 
            <React.Fragment>
                <LeftMenu
                    toggleLang={toggleLang}
                />
                <div id="green" className={`green-house `} >
                    <div className={`green-first`}>
                        <div className={`green-title`}>
                            {this.props.location.state.type === 'green-house' ?
                                <span className="title" >CR{this.props.location.state.id}</span>
                                :
                                <span className="title" >GR{this.props.location.state.id}</span>
                            }
                            <div className={`count`}>
                                <span><strong>{temperatures.total}</strong></span>
                            </div>
                        </div>
                        {/* <div className={`jobs-id`}>
                            <Link to="/timeline" className="birinjo">
                                <div className="little-box"></div>
                                <span>Korja 34754</span>
                            </Link>
                            <Link to="/timeline" className="birinjo color">
                                <div className="little-box"></div>
                                <span>Korja 78475</span>
                            </Link>
                            <Link to="/timeline" className="birinjo color1">
                                <div className="little-box"></div>
                                <span>Korja 64857</span>
                            </Link>
                        </div> */}
                        <div className={`sensor`}>
                            <div className="sensor-content">
                                <span>
                                    <img src="./assets/img/thermometer.png" alt=""/>
                                    Temperature {temperatures.current_temperature_start}
                                </span>
                                <span>
                                    <img src="./assets/img/weather-color.png" alt=""/>
                                    Humidity {temperatures.current_humidity_start}
                                </span>
                            </div>
                            <div className="sensor-content">
                                <span>
                                    <img src="./assets/img/thermometer.png" alt=""/>
                                    Temperature {temperatures.current_temperature_middle}
                                </span>
                                <span>
                                    <img src="./assets/img/weather-color.png" alt=""/>
                                    Humidity {temperatures.current_humidity_middle}
                                </span>
                            </div>
                            <div className="sensor-content">
                                <span>
                                    <img src="./assets/img/thermometer.png" alt=""/>
                                    Temperature {temperatures.current_temperature_end}
                                </span>
                                <span>
                                    <img src="./assets/img/weather-color.png" alt=""/>
                                    Humidity {temperatures.current_humidity_end}
                                </span>
                                {/* <span>
                                    <img src="./assets/img/done-tick1.png" alt=""/>
                                    12 - 18 C / 
                                    20 - 30 %    
                                </span>  */}
                            </div>
                        </div>
                    </div>
                    <div className={`first-part`}>
                        <Shelf 
                            shelf={shelf}
                            status={this.props.location.state.type}
                        />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default House;