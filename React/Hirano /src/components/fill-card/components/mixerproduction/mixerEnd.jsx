import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import mixerService from '../../../../services/mixerService';
import { getLanguage } from '../../../global/language';

class MixerEnd extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                ph_end: '',
                humidity_end: '',
                nr_blocks:'',
                nr_bllokave_demtuar: '',
                end_state: '',
                note: '',
                role: this.props.role
            },
            errors: {},
            loading:'',
        }
    }

    schema = {
        plant_id: Joi.number().integer().required(),
        humidity_end: Joi.number().integer().required(),
        nr_blocks: Joi.number().integer().required(),
        nr_bllokave_demtuar: Joi.number().integer().required(),
        // end: Joi.date().allow("").optional(),
        ph_end: Joi.number().integer().required(),
        role: Joi.string().required(),
        note: Joi.string().allow('').optional(),
        end_state: Joi.number().required(),
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, ph_end, humidity_end, nr_blocks, nr_bllokave_demtuar, end_state, note } = this.state.data;
            if(!note){
                note = ''
            }
            mixerService.postEnd(plant_id, ph_end, humidity_end, nr_blocks, nr_bllokave_demtuar, end_state, note).then(({ data }) => {
                this.setState({
                    loading: false,
                    data: {
                        plant_id: this.props.plant.id,
                        ph_end: '',
                        humidity_end: '',
                        nr_blocks:'',
                        nr_bllokave_demtuar: '',
                        end_state: '',
                        note: '',
                        role: this.props.role
                    },
                })
                toast.success("Editimi perfundoj me sukses.");            
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
        const { ph_end, humidity_end, nr_blocks, nr_bllokave_demtuar, end_state, note} = data;
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="materials">
                    {this.renderInput("ph_end", null, 'ph_end', ph_end, this.handleChange, errors.ph_end, false, `${getLanguage().ph_level_end}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("humidity_end", null, 'humidity_end', humidity_end, this.handleChange, errors.humidity_end, false, `${getLanguage().humidity_level_end}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("nr_blocks", null, 'nr_blocks', nr_blocks, this.handleChange, errors.nr_blocks, false, `${getLanguage().block_nr}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("nr_bllokave_demtuar", null, 'nr_bllokave_demtuar', nr_bllokave_demtuar, this.handleChange, errors.nr_bllokave_demtuar, false, `${getLanguage().damaged_blocks_nr}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput("end_state", null, 'end_state', end_state, this.handleChange, errors.end_state, false, `${getLanguage().end_condition_timewatch}`, false, 'number')}
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
export default MixerEnd;