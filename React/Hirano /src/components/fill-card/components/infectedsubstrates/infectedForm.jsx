import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import infectedSubstratesService from '../../../../services/infectedSubstratesService';
import { getLanguage } from '../../../global/language';

class InfectedForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                plant_id: this.props.plant.id,
                inf_green: 0,
                inf_orange: 0,
                inf_yellow: 0,
                inf_black: 0,
                inf_red: 0,
                tot_inf_blocks: 0,
                role: this.props.role,
                note: ''
            },
            errors: {},
            loading:'',
        }
    }

    schema = {
        plant_id: Joi.number().integer().required(),        
        inf_green: Joi.number().integer().required(),
        inf_orange: Joi.number().integer().required(),
        inf_yellow: Joi.number().integer().required(),
        inf_black: Joi.number().integer().required(),
        inf_red: Joi.number().integer().required(),
        tot_inf_blocks: Joi.number().allow('').optional(),
        role: Joi.string().required(),
        note: Joi.string().allow('').optional()
    }


    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, note } = this.state.data;

        if(!note){
            note = ''
        }
        infectedSubstratesService.post(plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, note).then(({ data }) => {
            this.setState({
                loading: false,
                data: {
                    plant_id: this.props.plant.id,
                    inf_green: 0,
                    inf_orange: 0,
                    inf_yellow: 0,
                    inf_black: 0,
                    inf_red: 0,
                    tot_inf_blocks: 0,
                    role: this.props.role,
                    note: ''
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

    onKeyUp = () => {
        let { data } = this.state;
        let { inf_green, inf_orange, inf_yellow, inf_black, inf_red } = data;
        let total = parseInt(inf_green) + parseInt(inf_orange) + parseInt(inf_yellow) + parseInt(inf_black) + parseInt(inf_red);
        data.tot_inf_blocks = total;
        this.setState({
            data
        })
    }
    
    render() {
        const { data, errors, loading } = this.state;
        const { inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, note} = data;
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit} className="mixer-form" >
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "inf_green", null, 'inf_green', inf_green, this.handleChange, errors.inf_green, false, `${getLanguage().green_infection}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "inf_orange", null, 'inf_orange', inf_orange, this.handleChange, errors.inf_orange, false, `${getLanguage().orange_infection}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "inf_yellow", null, 'inf_yellow', inf_yellow, this.handleChange, errors.inf_yellow, false, `${getLanguage().yellow_infection}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "inf_black", null, 'inf_black', inf_black, this.handleChange, errors.inf_black, false, `${getLanguage().black_infection}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "inf_red", null, 'inf_red', inf_red, this.handleChange, errors.inf_red, false, `${getLanguage().red_infection}`, false, 'number')}
                </div>
                <div className="materials">
                    {this.renderInput2(this.onKeyUp, "tot_inf_blocks", null, 'tot_inf_blocks', tot_inf_blocks, this.handleChange, errors.tot_inf_blocks, false, `${getLanguage().total_of_infectedblocks}`, true, 'number')}
                </div>
                {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                <div className="form-button">
                    {/* {(!id || role === 'admin') && */}
                        {/* <button>Ruaj te dhenat</button> */}
                        {/* {this.renderSubmitButton(`${getLanguage().save_data}`, loading)} */}
                        <button className={`myButton`} type="submit" >{getLanguage().save_data}</button>
                    {/* } */}
                    {/* {canAdd && id &&
                        <button type="button" onClick={addItem} >Shto Kontroll</button>
                    } */}
                </div>
                {/* {!canAdd && id &&
                    <div className="bottom-line"></div>
                } */}
            </form>
        )
    }
}

export default InfectedForm;
