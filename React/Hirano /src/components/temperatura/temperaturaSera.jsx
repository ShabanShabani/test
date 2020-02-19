import React from 'react';
import temperatureService from '../../services/temperatureService'
import Form from '../../all/common/form'
import * as toast from '../../all/toast'
import Joi from 'joi-browser';
import Table from './table'
import { getLanguage } from '../global/language';

class TemperaturaSera extends Form {
    constructor(props){
        super(props);
        // let {id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2 } = this.props.plant.autoclave;
        this.state = {
            temperature_data: [],
            data: {
                time: '',
                green_house_id: '',
                temperature1: '',
                temperature2: '',
                temperature3: '',
                temperature4: '',
                temperature_block_entry: '',
                temperature_block_middle: '',
                temperature_block_exit: '',
                middle_co2: '',
            },
            errors: {},
            loading:'',
            toggleDiv: 'fillTable',
            filter_date: this.props.filter_date,
            filter_date_to: this.props.filter_date_to
        }
    }
    schema = {
        id: Joi.number().integer().optional(),
        time: Joi.string().required(),
        green_house_id: Joi.string().required(),
        temperature1: Joi.string().required(),
        temperature2: Joi.number().integer().required(),
        temperature3: Joi.number().integer().required(),
        temperature4: Joi.number().integer().required(),
        temperature_block_entry: Joi.number().integer().required(),
        temperature_block_middle: Joi.number().integer().required(),
        temperature_block_exit: Joi.number().integer().required(),
        middle_co2: Joi.number().integer().required(),
    }

    dropdDownChange = (e) => {
        const {data} = this.state;
        data.time = e.target.value;
        this.setState({
            data
        });
    }
    
    dropdDownChangeSelect = (e) => {
        const {data} = this.state;
        data.green_house_id = e.target.value;
        this.setState({
            data
        });
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const {id, time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2} = this.state.data;

        if(id)
        {
            temperatureService.putGrowing(id, time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2).then(({ data }) => {
                this.setState({
                    loading: false
                })
                toast.success("Fushat u ruajten me sukses.");
                this.tableWillUpdate();
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }else{
            temperatureService.postGrowing(time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2).then(({ data }) => {
                this.setState({
                    loading: false
                })
                toast.success("Fushat u ruajten me sukses.");
                this.tableWillUpdate();
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }
    }

    componentDidMount(){
        let { temperature_data, filter_date, filter_date_to } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = filter_date.toLocaleString('en-GB', options);
        let to = filter_date_to.toLocaleString('en-GB', options);
        temperatureService.getFilterDateGrowing(from, to).then(({ data : response }) => {
            temperature_data = [].concat(response);
            this.setState({
                temperature_data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { temperature_data } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        temperatureService.getFilterDateGrowing(from, to).then(({ data : response }) => {
            temperature_data = [].concat(response);
            this.setState({
                temperature_data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    tableWillUpdate = () => {
        let { temperature_data } = this.state;
        temperatureService.getGrowing().then(({ data : response }) => {
            temperature_data = [].concat(response);
            this.setState({
                temperature_data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    onToggleDiv = (togglesecond) => {
        this.setState({
            toggleDiv: togglesecond
        });
    };

    render()
    {
        const { toggle } = this.props;        
        const { loading, data, errors, temperature_data, toggleDiv } = this.state;
        const { time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2 } = data;
        return(
            <React.Fragment>
                <div className={`first-temperature ${toggle === 'first' ? 'on' : 'off'}`}>
                    <div className={`second-card`}>
                        <div className={`sub-category`}>
                            <span onClick={() => this.onToggleDiv('fillTable')} >{getLanguage().fill_temp}</span>
                            <span onClick={() => this.onToggleDiv('table')} >{getLanguage().table}</span>
                        </div>
                        <div className={`toggle-div ${toggleDiv === 'fillTable' ? 'show' : 'first'}`}>
                            <div className="grid">
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="materials">
                                        <div className="input-field input-form input-control">
                                            <span className="input-name">{getLanguage().pick_time}</span>
                                            <select name="time" id="time" value={time} onChange={this.dropdDownChange}>
                                                <option value="" default>{getLanguage().pick_time}</option>
                                                <option value="08:00">08:00</option>
                                                <option value="12:00">12:00</option>
                                                <option value="16:00">16:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="materials">
                                        <div className="input-field input-form input-control">
                                            <span className="input-name">{getLanguage().gr_house_nr}</span>
                                            <select name="green_house_id" id="green_house_id" value={green_house_id} onChange={this.dropdDownChangeSelect}>
                                                <option value="" default>{getLanguage().pick_gr_house}</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature1", null, 'temperature1', temperature1, this.handleChange, errors.temperature1, false, `${getLanguage().temperature} 1`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature2", null, 'temperature2', temperature2, this.handleChange, errors.temperature2, false, `${getLanguage().temperature} 2`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature3", null, 'temperature3', temperature3, this.handleChange, errors.temperature3, false, `${getLanguage().temperature} 3`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature4", null, 'temperature4', temperature4, this.handleChange, errors.temperature4, false, `${getLanguage().temperature} 4`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature_block_entry", null, 'temperature_block_entry', temperature_block_entry, this.handleChange, errors.temperature_block_entry, false, `${getLanguage().temp_in_block}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature_block_middle", null, 'temperature_block_middle', temperature_block_middle, this.handleChange, errors.temperature_block_middle, false, `${getLanguage().temp_middle}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature_block_exit", null, 'temperature_block_exit', temperature_block_exit, this.handleChange, errors.temperature_block_exit, false, `${getLanguage().temp_out}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("middle_co2", null, 'middle_co2', middle_co2, this.handleChange, errors.middle_co2, false, `${getLanguage().co2_middle}`)}
                                    </div>
                                    <div className="form-button">
                                        {this.renderSubmitButton(`${getLanguage().save_data}`, loading, "")}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`toggle-div ${toggleDiv === 'table' ? 'show' : 'second'}`}>
                            <div className={`third-card`}>
                                <Table
                                    data={temperature_data}
                                    tableWillUpdate={this.tableWillUpdate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TemperaturaSera