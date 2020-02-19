import React from 'react';
import temperatureService from '../../services/temperatureService'
import Form from '../../all/common/form'
import * as toast from '../../all/toast'
import Joi from 'joi-browser';
import TableKultivimi from './tabelaKultivimi';
import { getLanguage } from '../global/language';

class TemperaturaKultivim extends Form {
    constructor(props){
        super(props);
        // let {id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2 } = this.props.plant.autoclave;
        this.state = {
            temperature_data: [],
            data: {
                time: '',
                green_house_id: '',
                temperature: '',
                block_temperature_entry: '',
                block_temperature_middle: '',
                block_temperature_exit: '',
                humidity: '',
                display_co2: '',
                entry_co2: '',
                middle_co2: '',
                exit_co2: '',
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
        temperature: Joi.number().integer().required(),
        block_temperature_entry: Joi.number().integer().required(),
        block_temperature_middle: Joi.number().integer().required(),
        block_temperature_exit: Joi.number().integer().required(),
        humidity: Joi.number().integer().required(),
        display_co2: Joi.number().integer().required(),
        entry_co2: Joi.number().integer().required(),
        middle_co2: Joi.number().integer().required(),
        exit_co2: Joi.number().integer().required(),
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
        const {id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2 } = this.state.data;

        if(id)
        {
            temperatureService.put(id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2).then(({ data }) => {
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
            temperatureService.post(time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2).then(({ data }) => {
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
        temperatureService.getFilterDateCultivation(from, to).then(({ data : response }) => {
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
        temperatureService.getFilterDateCultivation(from, to).then(({ data : response }) => {
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
        temperatureService.get().then(({ data : response }) => {
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
        const { time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2 } = data;
        return(
            <React.Fragment>
                <div className={`second-temperature ${toggle === 'second' ? 'on' : 'off'}`}>
                    <div className={`second-card`}>
                        <div className={`sub-category`}>
                            <span onClick={() => this.onToggleDiv('fillTable')} >Mbush Temperaturen</span>
                            <span onClick={() => this.onToggleDiv('table')} >Tabela</span>
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
                                            <span className="input-name">{getLanguage().pick_gr_house}</span>
                                            <select name="green_house_id" id="green_house_id" value={green_house_id} onChange={this.dropdDownChangeSelect}>
                                                <option value="" default>{getLanguage().pick_gr_house}</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("temperature", null, 'temperature', temperature, this.handleChange, errors.temperature, false, `${getLanguage().temperature}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("block_temperature_entry", null, 'block_temperature_entry', block_temperature_entry, this.handleChange, errors.block_temperature_entry, false, `${getLanguage().temperature_entry}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("block_temperature_middle", null, 'block_temperature_middle', block_temperature_middle, this.handleChange, errors.block_temperature_middle, false, `${getLanguage().temperature_middle}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("block_temperature_exit", null, 'block_temperature_exit', block_temperature_exit, this.handleChange, errors.block_temperature_exit, false, `${getLanguage().temperature_out}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("humidity", null, 'humidity', humidity, this.handleChange, errors.humidity, false, `Co2 ${getLanguage().humidity}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("display_co2", null, 'display_co2', display_co2, this.handleChange, errors.display_co2, false, `Co2 ${getLanguage().display}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("entry_co2", null, 'entry_co2', entry_co2, this.handleChange, errors.entry_co2, false, `Co2 ${getLanguage().entry}` )}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("middle_co2", null, 'middle_co2', middle_co2, this.handleChange, errors.middle_co2, false, `Co2 ${getLanguage().middle}`)}
                                    </div>
                                    <div className="materials">
                                        {this.renderInput("exit_co2", null, 'exit_co2', exit_co2, this.handleChange, errors.exit_co2, false, `Co2 ${getLanguage().out}`)}
                                    </div>
                                    <div className="form-button">
                                        {this.renderSubmitButton(`${getLanguage().save_data}`, loading, "")}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`toggle-div ${toggleDiv === 'table' ? 'show' : 'second'}`}>
                            <div className={`third-card`}>
                                <TableKultivimi
                                    data={temperature_data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TemperaturaKultivim