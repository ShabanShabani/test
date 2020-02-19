import React, {Component} from 'react';
import MixerStart from './mixerStart';
import MixerEnd from './mixerEnd';
import { getLanguage } from '../../../global/language';

class MixerProduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
        }
    }

    UNSAFE_componentWillReceiveProps(newProps){
        this.setState({
            plant: newProps.plant
        })
    }

    render() {
        const { plant }  = this.state;
        const { toggleList, updatePlant, role, pointer, privileges } = this.props;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);
        return (
            <React.Fragment>
                    <React.Fragment>
                            <div className={`timeline-info ${pointer === 3 ? 'active' : ''}`} >
                                <div className={`timeline-click`}>
                                    <span className="title" onClick={toggleList.bind(this)} >
                                        <img src="./assets/img/circle.svg" alt="" />
                                        {getLanguage().mixer_and_production}
                                    </span>
                                </div>
                                {plant.mixer_block_production.map(element => (
                                        <div key={element.id} className={`timeline-show ${pointer === 3 ? 'active' : ''}`}>
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
                                                        <span className="title">{getLanguage().mixer_blocks_start}</span>
                                                        <div className="materials">
                                                            <span>{getLanguage().ph_level_start}: {element.ph_start}</span>
                                                        </div>
                                                        <div className="materials">
                                                            <span>{getLanguage().humidity_level_mixer}: {element.humidity_start}</span>
                                                        </div>
                                                        <div className="materials">
                                                            <span>{getLanguage().timewatch_condition}: {element.start_state}</span>
                                                        </div>
                                                        <div className="materials">
                                                            <span>{getLanguage().note}: {element.note}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_mixer_block_production && plant.mixer_block_production && plant.mixer_block_production.length < 1)) &&
                                    <div className={`timeline-show ${pointer === 3 ? 'active' : ''}`}>
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
                                                    <span className="title">{getLanguage().mixer_blocks_start}</span>
                                                        <MixerStart
                                                            role={role}
                                                            plant={plant}
                                                            updatePlant={updatePlant}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {plant.status_value >= 4 &&
                                    <React.Fragment>
                                        {plant.mixer_block_production_end.map(element => (
                                                <div key={element.id} className={`timeline-show ${pointer === 3 ? 'active' : ''}`}>
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
                                                                <span className="title">{getLanguage().mixer_blocks_end}</span>
                                                                <div className="materials">
                                                                    <span>{getLanguage().ph_level_end}: {element.ph_end}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>humidity Level End of mixer: {element.humidity_end}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().block_nr}: {element.nr_blocks}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().damaged_blocks_nr}: {element.nr_bllokave_demtuar}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().timewatch_condition}: {element.end_state}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().diference_in_time}: {element.difference_hour}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().diference_in_timer}: {element.difference_state}</span>
                                                                </div>
                                                                <div className="materials">
                                                                    <span>{getLanguage().note}: {element.note}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_mixer_block_production_end && plant.mixer_block_production_end && plant.mixer_block_production_end.length < 1)) &&
                                            <div className={`timeline-show ${pointer === 3 ? 'active' : ''}`}>
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
                                                            <span className="title">{getLanguage().mixer_blocks_end}</span>                                        
                                                                <MixerEnd
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
            </React.Fragment>
        );
    }
}

export default MixerProduction;