import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import harvestingService from '../../../../services/harvestingService';
import AddEmployer from './addEmployer';
import { getLanguage } from '../../../global/language';

class ReedHarvesting extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                total_work_hours: 0,
                nr_total_ark: 0,
                weight_bruto: '',
                weight_neto: '',
                average_harvest_hour_kg: 0,
                nr_seres: '',
                role: this.props.role,
                note: '',
                histories: [{
                    name: '',
                    work_hours: 0,
                    quantity: 0,
                    average: 0,
                    weight_bruto_employe: 0,
                    weight_neto_employe: 0
                }],
            },
            errors: {},
            loading:'',
            options: [
                {"type":"cr", "value": 1, "text": `${getLanguage().sera} 1`},
                {"type":"cr", "value": 2, "text": `${getLanguage().sera} 2`},
                {"type":"cr", "value": 3, "text": `${getLanguage().sera} 3`},
                {"type":"cr", "value": 4, "text": `${getLanguage().sera} 4`},
                {"type":"cr", "value": 5, "text": `${getLanguage().sera} 5`},
                {"type":"cr", "value": 6, "text": `${getLanguage().sera} 6`},
                {"type":"cr", "value": 7, "text": `${getLanguage().sera} 7`},
                {"type":"cr", "value": 8, "text": `${getLanguage().sera} 8`},
                {"type":"cr", "value": 9, "text": `${getLanguage().sera} 9`},
                {"type":"cr", "value": 10, "text": `${getLanguage().sera} 10`},
                {"type":"cr", "value": 11, "text": `${getLanguage().sera} 11`},
                {"type":"cr", "value": 12, "text": `${getLanguage().sera} 12`},
                {"type":"cr", "value": 13, "text": `${getLanguage().sera} 13`}
            ],
            options1: [
                {"type":"rafte", "value": 1, "text": `${getLanguage().raft} 1`},
                {"type":"rafte", "value": 2, "text": `${getLanguage().raft} 2`},
                {"type":"rafte", "value": 3, "text": `${getLanguage().raft} 3`},
                {"type":"rafte", "value": 4, "text": `${getLanguage().raft} 4`},
                {"type":"rafte", "value": 5, "text": `${getLanguage().raft} 5`},
                {"type":"rafte", "value": 6, "text": `${getLanguage().raft} 6`},
                {"type":"rafte", "value": 7, "text": `${getLanguage().raft} 7`},
                {"type":"rafte", "value": 8, "text": `${getLanguage().raft} 8`},
                {"type":"rafte", "value": 9, "text": `${getLanguage().raft} 9`},
                {"type":"rafte", "value": 10, "text": `${getLanguage().raft}  10`},
                {"type":"rafte", "value": 11, "text": `${getLanguage().raft}  11`},
                {"type":"rafte", "value": 12, "text": `${getLanguage().raft}  12`},
                {"type":"rafte", "value": 13, "text": `${getLanguage().raft}  13`},
                {"type":"rafte", "value": 14, "text": `${getLanguage().raft}  14`},
                {"type":"rafte", "value": 15, "text": `${getLanguage().raft}  15`},
                {"type":"rafte", "value": 16, "text": `${getLanguage().raft}  16`},
                {"type":"rafte", "value": 17, "text": `${getLanguage().raft}  17`},
                {"type":"rafte", "value": 18, "text": `${getLanguage().raft}  18`},
                {"type":"rafte", "value": 19, "text": `${getLanguage().raft}  19`},
                {"type":"rafte", "value": 20, "text": `${getLanguage().raft}  20`},
                {"type":"rafte", "value": 21, "text": `${getLanguage().raft}  21`},
                {"type":"rafte", "value": 22, "text": `${getLanguage().raft}  22`},
                {"type":"rafte", "value": 23, "text": `${getLanguage().raft}  23`},
                {"type":"rafte", "value": 24, "text": `${getLanguage().raft}  24`},
                {"type":"rafte", "value": 25, "text": `${getLanguage().raft}  25`},
                {"type":"rafte", "value": 26, "text": `${getLanguage().raft}  26`},
                {"type":"rafte", "value": 27, "text": `${getLanguage().raft}  27`},
                {"type":"rafte", "value": 28, "text": `${getLanguage().raft}  28`},
                {"type":"rafte", "value": 29, "text": `${getLanguage().raft}  29`},
                {"type":"rafte", "value": 30, "text": `${getLanguage().raft} 30`},
                {"type":"rafte", "value": 31, "text": `${getLanguage().raft} 31`},
                {"type":"rafte", "value": 32, "text": `${getLanguage().raft} 32`},
                {"type":"rafte", "value": 33, "text": `${getLanguage().raft} 33`},
                {"type":"rafte", "value": 34, "text": `${getLanguage().raft} 34`},
                {"type":"rafte", "value": 35, "text": `${getLanguage().raft} 35`},
                {"type":"rafte", "value": 36, "text": `${getLanguage().raft} 36`},
                {"type":"rafte", "value": 37, "text": `${getLanguage().raft} 37`},
                {"type":"rafte", "value": 38, "text": `${getLanguage().raft} 38`},
                {"type":"rafte", "value": 39, "text": `${getLanguage().raft} 39`},
                {"type":"rafte", "value": 40, "text": `${getLanguage().raft} 40`},
                {"type":"rafte", "value": 41, "text": `${getLanguage().raft} 41`},
                {"type":"rafte", "value": 42, "text": `${getLanguage().raft} 42`}
            ],
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    schema = {
        plant_id: Joi.number().integer().required(),
        total_work_hours: Joi.number().integer().required(),
        nr_total_ark: Joi.number().integer().required(),
        weight_bruto: Joi.number().integer().required(),
        weight_neto: Joi.number().integer().required(),
        average_harvest_hour_kg: Joi.number().required(),
        nr_seres: Joi.number().integer().required(),
        role: Joi.string().required(),
        note: Joi.string().allow('').optional(),
        histories: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            work_hours: Joi.number().integer().required(),
            quantity: Joi.number().integer().required(),
            average: Joi.number().required(),
            weight_bruto_employe: Joi.number().required(),
            weight_neto_employe: Joi.number().required()
        }))
    }

    onWorkChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;

        histories[index].work_hours = value;
        this.setState({
            data
        });
    }

    onNameChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].name = value;
        this.setState({
            data
        });
    }

    onQuantityChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].quantity = value;
        this.setState({
            data
        });
    }

    onAverageChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].average = value;
        this.setState({
            data
        });
    }

    onWeightBrutoEmploye = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].weight_bruto_employe = value;
        this.setState({
            data
        });
    }

    onWeightNetoEmploye = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].weight_neto_employe = value;
        this.setState({
            data
        });
    }

    addInoculationShelf = (index) => {
        const { data } = this.state;
        data.histories.push({
            name: '',
            work_hours: 0,
            quantity: 0,
            average: 0,
            weight_bruto_employe: 0,
            weight_neto_employe: 0
        })
        this.setState({
            data
        });
    }

    deleteInoculationShelf = (index) => {
        let { data } = this.state;
        data.histories.splice(index, 1)
        this.setState({
            data
        });
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, total_work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, note, histories } = this.state.data;
        if(!note){
            note = ''
        }
        harvestingService.post(plant_id, total_work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, note, histories).then(({ data }) => {
            this.setState({
                loading: false,
                data:{
                    plant_id: this.props.plant.id,
                    total_work_hours: '',
                    nr_total_ark: '',
                    weight_bruto: '',
                    weight_neto: '',
                    average_harvest_hour_kg: '',
                    nr_seres: '',
                    role: this.props.role,
                    note: '',
                    histories: [{
                        name: '',
                        work_hours: '',
                        quantity: '',
                        average: '',
                        weight_bruto_employe: 0,
                        weight_neto_employe: 0
                    }],
                }
            })
            toast.success("Mbjellja perfundoj me sukses.");
            this.props.updatePlant();
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }


    onWorkHours = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].work_hours)
        }
        data.total_work_hours = count;
        this.setState({
            data
        })
        this.onAverage();
    }
    
    onQuantity = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].quantity)
        }
        data.nr_total_ark = count;
        this.setState({
            data
        })
        this.onAverage();
    }

    onAverage = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].average)
        }
        data.average_harvest_hour_kg = count / histories.length;
        this.setState({
            data
        })
    }

    render() {
        const { options, options1, data, errors, plant, loading } = this.state;
        const { histories, total_work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, role, note } = data;
        const { toggleList, pointer, privileges } = this.props;
        let optionsDay = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', optionsDay);
        return (
            <React.Fragment>
            <div onClick={toggleList.bind(this)} className={`timeline-info ${pointer === 8 ? 'active' : ''}`} >
                <div className={`timeline-click`}>
                    <span className="title">
                        <img src="./assets/img/circle.svg" alt="" />
                        Korrja e Kerpudhave
                    </span>
                </div>
                {plant.harvesting.map((element, index) =>(
                    <div key={index} className={`timeline-show ${pointer === 8 ? 'active' : ''}`}>
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
                                    <span>Start:</span>
                                    <span>{element.time}</span>
                                    <span><img src="./assets/img/circle.svg" alt="" /></span>
                                    <span>{element.user.name}</span>
                                </div>
                                <div className={`progress-content`}>
                                    <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span>
                                    {
                                        element.employees.map((e, idx) =>
                                            <div key={idx} className={`extra-form map`}>
                                                <div className="materials">
                                                    <span>{getLanguage().name}: {e.name}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().hours_of_work}: {e.work_hours}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().nr_of_crates}: {e.quantity}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().avg_of_harvest}: {e.average}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>Pesha Bruto e Kerpurdhave: {e.weight_bruto_employe}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>Pesha Neto e Kerpurdhave: {e.weight_neto_employe}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="materials">
                                        <span>{getLanguage().hours_of_work}: {element.work_hours}</span>
                                    </div>
                                    <div className="materials">
                                        <span>{getLanguage().total_crates}: {element.nr_total_ark}</span>
                                    </div>
                                    <div className="materials">
                                        <span>Pesha Bruto e Kerpudhave: {element.weight_bruto}</span>
                                    </div>
                                    <div className="materials">
                                        <span>Pesha Neto e Kerpudhave: {element.weight_neto}</span>
                                    </div>
                                    <div className="materials">
                                        <span>{getLanguage().avg_of_harvest}: {element.average_harvest_hour_kg}</span>
                                    </div>
                                    <div className="materials">
                                        <span>{getLanguage().gr_house_nr}: {element.nr_seres}</span>
                                    </div>
                                    <div className="materials">
                                        <span>{getLanguage().note}: {element.note}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_harvesting && plant.harvesting && plant.harvesting.length < 1)) &&
                    <div className={`timeline-show ${pointer === 8 ? 'active' : ''}`}>
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
                                    {/* <span><img src="./assets/img/circle.svg" alt="" /></span>
                                    <span>Start</span>
                                    <span>9:55am</span> */}
                                </div>
                                <div className={`progress-content`}>
                                    <form autoComplete="off" onSubmit={this.handleSubmit} >
                                        {
                                            histories.map((history, index) =>
                                                <AddEmployer
                                                    key={index}
                                                    history={history}
                                                    index={index}
                                                    options={options}
                                                    options1={options1}
                                                    onChange={this.onWorkChange}
                                                    onChange1={this.onNameChange}
                                                    onChange2={this.onQuantityChange}
                                                    onChange3={this.onAverageChange}
                                                    onChange4={this.onWeightBrutoEmploye}
                                                    onChange5={this.onWeightNetoEmploye}
                                                    deleteInoculationShelf={this.deleteInoculationShelf}
                                                    plant={plant}
                                                    addInoculationShelf={this.addInoculationShelf}
                                                    length={histories.length}
                                                    onKey={this.onWorkHours}
                                                    onQuantity={this.onQuantity}
                                                />
                                            )
                                        }
                                        <React.Fragment>
                                            <div className="materials">
                                                {this.renderInput("total_work_hours", null, 'total_work_hours', total_work_hours, this.handleChange, errors.total_work_hours, false, `${getLanguage().total_hours}`, true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("nr_total_ark", null, 'nr_total_ark', nr_total_ark, this.handleChange, errors.nr_total_ark, false, `${getLanguage().total_crates}`, true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("weight_bruto", null, 'weight_bruto', weight_bruto, this.handleChange, errors.weight_bruto, false, `${getLanguage().gross_weight}`)}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("weight_neto", null, 'weight_neto', weight_neto, this.handleChange, errors.weight_neto, false, `${getLanguage().net_weight}`)}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("average_harvest_hour_kg", null, 'average_harvest_hour_kg', average_harvest_hour_kg, this.handleChange, errors.average_harvest_hour_kg, false, `${getLanguage().avg_for_crate}`, true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("nr_seres", null, 'nr_seres', nr_seres, this.handleChange, errors.nr_seres, false, `${getLanguage().gr_house_nr}`)}
                                            </div>
                                            {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                                            <div className="form-button">
                                                {/* {this.renderSubmitButton(`${getLanguage().save_data}`, loading)} */}
                                                <button className={`myButton`} type="submit" >{getLanguage().save_data}</button>
                                            </div>
                                        </React.Fragment>
                                    </form>
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

export default ReedHarvesting;