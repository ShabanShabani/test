import React, {Component} from 'react';
import AutoclaveStart from './autoclaveStart';
import AutoclaveEnd from './autoclaveEnd';
import { getLanguage } from '../../../global/language';

class Autoclave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    render() {
        const { plant } = this.state;
        const { toggleList, updatePlant, role, pointer, privileges } = this.props;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);

        return (
            <React.Fragment>
                    <div className={`timeline-info ${pointer === 5 ? 'active' : ''}`} >
                        <div className={`timeline-click`}>
                        <span onClick={toggleList.bind(this)} className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Autoclave / {getLanguage().serilization_room}
                        </span>
                    </div>
                        {plant.autoclave.map(element => (
                            <div key={element.id} className={`timeline-show ${pointer === 5 ? 'active' : ''}`}>
                                <div className={`timline-helper`}>
                                    <div className={`left-timeline`}>
                                        <img src="./assets/img/circle.svg" alt="" />
                                        <div className="line">
                                            <div className="line-wrapper"></div>
                                        </div>
                                    </div>
                                    <div className={`right-timeline`}>
                                        <div className={`progress`} >
                                            <span>{element.start}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>{getLanguage().start}:</span>
                                            <span>{element.time}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>{element.user.name}</span>
                                        </div>
                                        <div className={`progress-content`}>
                                            <span className="title">{getLanguage().start}</span>
                                            <div className="materials">
                                                <span>{getLanguage().humidity_start}: {element.humidity_start}</span>
                                            </div>
                                            <div className="materials">
                                                <span>{getLanguage().temp_start} {element.temperature_start}</span>
                                            </div>
                                            <div className="materials">
                                                <span>{getLanguage().note}: {element.note}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_autoclave && plant.autoclave && plant.autoclave.length < 1)) &&
                            <div className={`timeline-show ${pointer === 5 ? 'active' : ''}`}>
                                <div className={`timline-helper`}>
                                    <div className={`left-timeline`}>
                                        <img src="./assets/img/circle.svg" alt="" />
                                        <div className="line">
                                            <div className="line-wrapper"></div>
                                        </div>
                                    </div>
                                    <div className={`right-timeline`}>
                                        <div className={`progress`} >
                                            <span>{today}</span>
                                        </div>
                                        <div className={`progress-content`}>
                                            <span className="title">{getLanguage().start}</span>
                                            <AutoclaveStart
                                                role={role}
                                                plant={plant}
                                                updatePlant={updatePlant}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {plant.status_value >= 7 &&
                            <React.Fragment>
                                {plant.autoclave_end.map(element => (
                                    <div key={element.id} className={`timeline-show ${pointer === 5 ? 'active' : ''}`}>
                                        <div className={`timline-helper`}>
                                            <div className={`left-timeline`}>
                                                <img src="./assets/img/circle.svg" alt="" />
                                                <div className="line">
                                                    <div className="line-wrapper"></div>
                                                </div>
                                            </div>
                                            <div className={`right-timeline`}>
                                                <div className={`progress`} >
                                                    <span>{element.end}</span>
                                                    <span><img src="./assets/img/circle.svg" alt="" /></span>
                                                    <span>{getLanguage().end}:</span>
                                                    <span>{element.time}</span>
                                                    <span><img src="./assets/img/circle.svg" alt="" /></span>
                                                    <span>{element.user.name}</span>
                                                </div>
                                                <div className={`progress-content`}>
                                                    <span className="title">{getLanguage().end}</span>
                                                    <div className="materials">
                                                        <span>{getLanguage().humidity_end}: {element.humidity_end}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>{getLanguage().temp_end}: {element.temperature_end}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>{getLanguage().note}: {element.note}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_autoclave_end && plant.autoclave_end && plant.autoclave_end.length < 1)) &&
                                    <div className={`timeline-show ${pointer === 5 ? 'active' : ''}`}>
                                        <div className={`timline-helper`}>
                                            <div className={`left-timeline`}>
                                                <img src="./assets/img/circle.svg" alt="" />
                                                <div className="line">
                                                    <div className="line-wrapper"></div>
                                                </div>
                                            </div>
                                            <div className={`right-timeline`}>
                                                <div className={`progress`} >
                                                    <span>{today}</span>
                                                </div>
                                                <div className={`progress-content`}>
                                                    <span className="title">{getLanguage().end}</span>
                                                    <AutoclaveEnd
                                                        role={role}
                                                        plant={plant}
                                                        updatePlant={updatePlant}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        }
                    </div>
            </React.Fragment>
        );
    }
}


export default Autoclave;