import React, { Component } from 'react';
import weatherService from '../../services/weatherService';
import Skycons from 'react-skycons';
import InfoPopup from './infoPopup';
import SVG from './svg'
import danger from '../json/dangerPopup';
import temperatureService from '../../services/temperatureService'
import getSocket from '../../all/common/socket'
import stockService from '../../services/stockService'

class Fabric extends Component {
    constructor(props){
        super(props)
        this.state={
            data: {
                temperature:'',
                time: '',
                summary: '',
                icon: '',
                sunriseTime: '',
                sunsetTime: '',
                temperatureHigh: '',
                temperatureLow: '',
                uvIndex: '',
            },
            hover: false,
            none: '',
            dangerPopup: danger.danger,
            infoPopup: [],
            live_data:[],
            avg_days:[],
            stock_alert: []
        }
    }
    componentDidMount(){
        let { stock_alert } = this.state;
        getSocket().on("live", (response) => {
            temperatureService.getLiveImage().then(({ data : response }) => {
                this.setState({
                    live_data:[].concat(response),
                    loading: false
                })
            })
        });
        temperatureService.getAvgDays().then(({ data : response }) => {
            this.setState({
                avg_days:[].concat(response),
                loading: false
            }) 
        })
        temperatureService.getLiveImage().then(({ data : response }) => {
            this.setState({
                live_data:[].concat(response),
                loading: false
            })
            
        })
        stockService.getStockAlert().then(({ data : response }) => {
            stock_alert = [].concat(response);
            this.setState({
                stock_alert
            })
        })
        let {data}=this.state
        weatherService.getCurrentWeather().then(({data:response}) =>{
            data.temperature = response.currently.temperature
            data.icon=response.currently.icon
            let day =response.daily.data[0]
            data.time=response.currently.time
            data.summary=day.summary
            data.sunriseTime=day.sunriseTime
            data.sunsetTime=day.sunsetTime
            data.temperatureHigh=day.temperatureHigh
            data.temperatureLow=day.temperatureLow
            data.uvIndex=day.uvIndex
            this.setState({
                data
            })
        })
    }
    
    greenHouse = () => {
        window.location = '/green-house'
    }

    render() { 
        const { data, dangerPopup, live_data, avg_days, stock_alert } = this.state;
        const  { temperature, icon } = data;
        return (  
            <React.Fragment>
                <div className={`fabric-wrapper`} >
                    {
                        dangerPopup.map((element, index) =>
                            <InfoPopup
                                avg_day={avg_days[index]}
                                id={element.id}
                                index={index}
                                key={index}
                                top={element.x}
                                left={element.y}   
                                spanTop={element.sx}
                                spanLeft={element.sy}   
                                spanRotate={element.r}
                                otherTop={element.e}
                                otherLeft={element.z}
                                type={element.type}
                                liveData={live_data[index]}
                                stock_alert={stock_alert}    
                            />
                        )
                    }
                    <div className="weather">
                        <div className="weather-icon">{icon.length > 0 &&
                            <div>
                                <Skycons 
                                    color='#f1883e' 
                                    icon={icon.toUpperCase().replace(/-/g, "_")}
                                    autoplay={true}
                                /> 
                                <span style={{color: '#f1883e'}}>{parseInt(temperature)} C°</span>
                            </div>
                        }
                        </div>
                    </div>
                    <SVG avg_days={avg_days} />
               </div>
            </React.Fragment>
        );
    }
}
 
export default Fabric;