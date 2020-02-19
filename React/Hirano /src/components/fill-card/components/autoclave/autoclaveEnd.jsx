import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import autoClaveService from '../../../../services/autoClaveService';
import { getLanguage } from '../../../global/language';

class Autoclave extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                humidity_end: '',
                temperature_end: '',
                note: ''
            },
            errors: {},
            loading:'',
        }
    }
    
    schema = {
        plant_id: Joi.number().integer().required(),
        humidity_end: Joi.number().integer().required(),
        temperature_end: Joi.number().integer().required(),
        note: Joi.string().allow('').optional()
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, humidity_end, temperature_end, note } = this.state.data;
            if(!note){
                note = ''
            }
            autoClaveService.postEnd(plant_id, humidity_end, temperature_end, note).then(({ data }) => {
                this.setState({
                    loading: false,
                    data: {
                        plant_id: this.props.plant.id,
                        humidity_end: '',
                        temperature_end: '',
                        note: ''
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

    render() {
        const { data, errors, loading } = this.state;
        const { humidity_end, temperature_end, note } = data;

        return (
            <React.Fragment>
                <form autoComplete="off" onSubmit={this.handleSubmit} >
                    <div className="materials">
                        {this.renderInput("humidity_end", null, 'humidity_end', humidity_end, this.handleChange, errors.humidity_end, false, `${getLanguage().humidity_end}`, false, 'number')}
                    </div>
                    <div className="materials">
                        {this.renderInput("temperature_end", null, 'temperature_end', temperature_end, this.handleChange, errors.temperature_end, false, `${getLanguage().temp_end}`, false, 'number')}
                    </div>
                    {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                    <div className="form-button">
                        {/* {this.renderSubmitButton(`${getLanguage().save_data}`, loading)} */}
                        <button className={`myButton`} type="submit" >{getLanguage().save_data}</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


export default Autoclave;