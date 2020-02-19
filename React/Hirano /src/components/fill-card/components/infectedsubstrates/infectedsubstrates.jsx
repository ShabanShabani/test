import React from 'react';
import Form from '../../../../all/common/form';
import InfectedForm from './infectedForm';
import { getLanguage } from '../../../global/language';

class InfectedSubstrates extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            histories: this.props.plant.control_infected_substrates,
            errors: {},
            loading:'',
        }
    }
    
    componentDidMount() {
        const { histories } = this.state;
        let allHostories = [];
        if (histories.length > 0) {
          allHostories = [].concat(histories);
        } else {
          allHostories.push({
            plant_id: this.props.plant.id,
            inf_green: '',
            inf_orange: '',
            inf_yellow: '',
            inf_black: '',
            inf_red: '',
            nr_green_house: '',
            tot_inf_blocks: '',
          });
        }
        this.setState({
          histories: allHostories
        });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        let allHostories = [];
        if (newProps.plant.control_infected_substrates.length > 0) {
          allHostories = [].concat(newProps.plant.control_infected_substrates);
        } else {
          allHostories.push({
            plant_id: this.props.plant.id,
            inf_green: '',
            inf_orange: '',
            inf_yellow: '',
            inf_black: '',
            inf_red: '',
            nr_green_house: '',
            tot_inf_blocks: '',
            note: ''
          });
        }
        this.setState({
            histories: allHostories,
            plant: newProps.plant
        })
    }

    addInfectedSubstrates = () => {
        const { histories } = this.state;
        histories.push({
            plant_id: this.props.plant.id,
            inf_green: '',
            inf_orange: '',
            inf_yellow: '',
            inf_black: '',
            inf_red: '',
            nr_green_house: '',
            tot_inf_blocks: '',
            note: ''
        });
        this.setState({
          histories
        });
    };
    
    render() {
        const { plant} = this.state;
        const { toggleList, updatePlant, role, pointer, privileges } = this.props;
        let options2 = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options2);
        return (
            <React.Fragment>
                    <div className={`timeline-info ${pointer === 7 ? 'active' : ''}`} >
                        <div className={`timeline-click`}>
                            <span className="title" onClick={toggleList.bind(this)}>
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().control_of_infectedsub}
                            </span>
                        </div>
                        {plant.control_infected_substrates.map((element, index) => (
                            <div key={index} className={`timeline-show ${pointer === 7 ? 'active' : ''}`}>
                                <div className={`timline-helper`}>
                                    <div className={`left-timeline`}>
                                        <img src="./assets/img/circle.svg" alt="" />
                                        <div className="line">
                                            <div className="line-wrapper"></div>
                                        </div>
                                    </div>
                                    <div className={`right-timeline`}>
                                        <div className={`progress`} >
                                            <span>{element.date}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>Start</span>
                                            <span>{element.time}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>{element.user.name}</span>
                                        </div>
                                        <div className={`progress-content`}>
                                            <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span>
                                            <div className="materials">
                                                <span>Substratet me infeksion te Gjelber: {element.infection_green}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Substratet me infeksion te Portokalltë: {element.infection_orange}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Substratet me infeksion te Verdhë: {element.infection_yellow}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Substratet me infeksion te Zezë: {element.infection_black}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Substratet me infeksion te Kuqe: {element.infection_red}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Totali: {element.total}</span>
                                            </div>
                                            <div className="materials">
                                                <span>Shenimi: {element.note}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_harvesting && plant.status_value === 9)) &&
                            <div className={`timeline-show ${pointer === 7 ? 'active' : ''}`}>
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
                                            <InfectedForm      
                                                plant={plant}
                                                updatePlant={updatePlant}
                                                role={role}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
            </React.Fragment>
        );
    }
}

export default InfectedSubstrates;