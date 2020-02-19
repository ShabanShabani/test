import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import mixerService from '../../../../services/mixerService';
import { getLanguage } from '../../../global/language';

class MixerStart extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                ph_start: '',
                humidity_start: '',
                start_state: '',
                note: ''
            },
            errors: {},
            loading:'',
        }
    }

    schema = {
        plant_id: Joi.number().integer().required(),
        ph_start: Joi.number().integer().required(),
        humidity_start: Joi.number().integer().required(),
        start_state: Joi.number().required(),
        note: Joi.string().allow('').optional()
    }

    onDatePickerChange = date => {
        const { data } = this.state;
        data.start = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({
            data
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, ph_start, humidity_start, start_state, note } = this.state.data;

        if(!note){
            note = ''
        }
        mixerService.post(plant_id, ph_start, humidity_start, start_state, note).then(({ data }) => {
            this.setState({
                loading: false,
                data: {
                    plant_id: this.props.plant.id,
                    ph_start: '',
                    humidity_start: '',
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
        const { data, errors, loading }  = this.state;
        const { ph_start, humidity_start, start_state, note } = data;
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="materials">
                    {this.renderInput("ph_start", null, 'ph_start', ph_start, this.handleChange, errors.ph_start, false, `${getLanguage().ph_level_start}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("humidity_start", null, 'humidity_start', humidity_start, this.handleChange, errors.humidity_start, false, `${getLanguage().humidity_level_mixer}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("start_state", null, 'start_state', start_state, this.handleChange, errors.start_state, false, `${getLanguage().timewatch_condition}`, false, 'number')}
                </div>
                {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                <div className="form-button">
                    {/* {this.renderSubmitButton(`${getLanguage().save_data}`, loading, "")} */}
                    <button className={`myButton`} type="submit" >{getLanguage().save_data}</button>
                </div>
            </form>
        )
    }
}
export default MixerStart;