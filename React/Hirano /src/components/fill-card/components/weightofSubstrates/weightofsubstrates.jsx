import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import peshaMesatreService from '../../../../services/peshaMesatareService';
import { getLanguage } from '../../../global/language';

class AvWeightofSubstrates extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                substrate1: 0,
                substrate2: 0,
                substrate3: 0,
                substrate4: 0,
                substrate5: 0,
                substrate6: 0,
                substrate7: 0,
                substrate8: 0,
                substrate9: 0,
                pesha_mesatare: 0,
                note: '',
                role: this.props.role
            },
            errors: {},
            loading:'',
        }
    }

    schema = {
        plant_id: Joi.number().required(),
        substrate1: Joi.number().required(),
        substrate2: Joi.number().required(),
        substrate3: Joi.number().required(),
        substrate4: Joi.number().required(),
        substrate5: Joi.number().required(),
        substrate6: Joi.number().required(),
        substrate7: Joi.number().required(),
        substrate8: Joi.number().required(),
        substrate9: Joi.number().required(),
        pesha_mesatare: Joi.number().required(),
        role: Joi.string().required(),
        note: Joi.string().allow('').optional()
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, note} = this.state.data;
        if(!note){
            note = ''
        }
        peshaMesatreService.post(plant_id, substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, note).then(({ data }) => {
            this.setState({
                loading: false,
                data: {
                    plant_id: this.props.plant.id,
                    substrate1: 0,
                    substrate2: 0,
                    substrate3: 0,
                    substrate4: 0,
                    substrate5: 0,
                    substrate6: 0,
                    substrate7: 0,
                    substrate8: 0,
                    substrate9: 0,
                    pesha_mesatare: 0,
                    note: '',
                    role: this.props.role
                },
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

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    onKeyUp = () => {
        let { data } = this.state;
        let { substrate1, substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9 } = data;
        let subtotal = parseInt(substrate1) + parseInt(substrate2) + parseInt(substrate3) + parseInt(substrate4) + parseInt(substrate5) + parseInt(substrate6) + parseInt(substrate7) + parseInt(substrate8) + parseInt(substrate9)
        let total = subtotal / 9;
        data.pesha_mesatare = total.toFixed(2);
        this.setState({
            data
        })
    }

    render() {
        const { plant, errors, data, loading }  = this.state;
        const { toggleList, role, pointer, privileges } = this.props;
        const {substrate1, substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, note } = data;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);
        return (
            <React.Fragment>
                <div className={`timeline-info ${pointer === 4 ? 'active' : ''}`} >
                    <div className={`timeline-click`}>
                        <span className="title" onClick={toggleList.bind(this)}>
                            <img src="./assets/img/circle.svg" alt="" />
                            {getLanguage().avg_weight_sub}
                        </span>
                    </div>
                   <React.Fragment>
                            {plant.average_weight_substrates.map(element => (
                                <div key={element.id} className={`timeline-show ${pointer === 4 ? 'active' : ''}`}>
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
                                                <span className="title">{getLanguage().first_land_production}</span>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 1: {element.substrate1.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 2: {element.substrate2.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 3: {element.substrate3.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 4: {element.substrate4.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 5: {element.substrate5.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 6: {element.substrate6.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 7: {element.substrate7.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 8: {element.substrate8.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().substrat} 9: {element.substrate9.toFixed(2)}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().block_avg_weight}: {element.pesha_mesatare}</span>
                                                </div>
                                                <div className="materials">
                                                    <span>{getLanguage().note}: {element.note}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_average_weight_substrates && plant.average_weight_substrates && plant.average_weight_substrates.length < 1)) &&
                        <div className={`timeline-show ${pointer === 4 ? 'active' : ''}`}>
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
                                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate1", null, 'substrate1', substrate1, this.handleChange, errors.substrate1, false, `${getLanguage().substrat} 1`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate2", null, 'substrate2', substrate2, this.handleChange, errors.substrate2, false, `${getLanguage().substrat} 2`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate3", null, 'substrate3', substrate3, this.handleChange, errors.substrate3, false, `${getLanguage().substrat} 3`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate4", null, 'substrate4', substrate4, this.handleChange, errors.substrate4, false, `${getLanguage().substrat} 4`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate5", null, 'substrate5', substrate5, this.handleChange, errors.substrate5, false, `${getLanguage().substrat} 5`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate6", null, 'substrate6', substrate6, this.handleChange, errors.substrate6, false, `${getLanguage().substrat} 6`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate7", null, 'substrate7', substrate7, this.handleChange, errors.substrate7, false, `${getLanguage().substrat} 7`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate8", null, 'substrate8', substrate8, this.handleChange, errors.substrate8, false, `${getLanguage().substrat} 8`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "substrate9", null, 'substrate9', substrate9, this.handleChange, errors.substrate9, false,` ${getLanguage().substrat} 9`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput2(this.onKeyUp, "pesha_mesatare", null, 'pesha_mesatare', pesha_mesatare, this.handleChange, errors.pesha_mesatare, false, `${getLanguage().block_avg_weight}`, true, 'number')}
                                            </div>
                                            {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                                            <div className="form-button">
                                                {/* <button>Ruaj te dhenat</button> */}
                                                {this.renderSubmitButton(`${getLanguage().save_data}`, loading)}
                                            </div>
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

export default AvWeightofSubstrates;