import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import jobReport from '../../../../services/jobReport';
import { getLanguage } from '../../../global/language';

class GenerateReport extends Form {
    minDruAhu = ''; 

    constructor(props) {
        super(props);
        this.minDruAhu = 2;
        const { dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note } = this.props.plant.job_report;
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                dru_bungu: dru_bungu,
                dru_ahu: dru_ahu,
                krunde: krunde,
                miser_bluar: miser_bluar,
                gips: gips,
                shkums: shkums,
                // data_mix: null,
                uje: uje,
                nr_bllokave: nr_bllokave,
                kese: kese,
                note: note
            },
            stoku: this.props.stoku,
            errors: {},
            loading:'',
        }
    }

    schema = {}
    validateStock(name){
       if(this.state.stoku)
       {
        const element =this.state.stoku.filter(element =>{
            if(element){
                if(element.name === name){
                    return element;
                }
            }
            return 0;
        })
        if (element[0]){
            return element[0].quantity;
        }
        return 0;
       }
       return 0;
    }

    componentDidMount(){
        const { dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note } = this.props.plant.job_report;
        this.schema = {
            plant_id: Joi.number().integer().required(),
            dru_bungu: Joi.number().integer().min(0).max(this.validateStock('Dru Bung')).optional(),
            dru_ahu: Joi.number().integer().min(0).max(this.validateStock('Dru Ahu')).required(),
            krunde: Joi.number().integer().min(0).max(this.validateStock('Krunde')).required(),
            miser_bluar: Joi.number().integer().min(0).max(this.validateStock('Miser i Bluar')).required(),
            gips: Joi.number().integer().min(0).max(this.validateStock('Gips')).required(),
            shkums: Joi.number().integer().min(0).max(this.validateStock('Shkums')).required(),
            // data_mix: Joi.date().allow("").optional(),
            uje: Joi.number().integer().min(0).required(),
            nr_bllokave: Joi.number().integer().min(0).required(),
            kese: Joi.number().integer().min(0).max(this.validateStock('Kese')).required(),
            note: Joi.string().allow('').optional()
        }
        this.setState({
            data: {
                plant_id: this.props.plant.id,
                dru_bungu: dru_bungu,
                dru_ahu: dru_ahu,
                krunde: krunde,
                miser_bluar: miser_bluar,
                gips: gips,
                shkums: shkums,
                // data_mix: null,
                uje: uje,
                nr_bllokave: nr_bllokave,
                kese: kese,
                note: note
            }
        })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        const { data } = this.state;
        const { dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note } = newProps.plant.job_report;
        data.plant_id= this.props.plant.id;
        data.dru_bungu= dru_bungu;
        data.dru_ahu= dru_ahu;
        data.krunde= krunde;
        data.miser_bluar= miser_bluar;
        data.gips= gips;
        data.shkums= shkums;
        data.uje= uje;
        data.nr_bllokave= nr_bllokave;
        data.kese= kese;
        data.note= note;
        this.setState({
            data,
            plant: newProps.plant
        })
    }

    onDatePickerChange = date => {
        const { data } = this.state;
        data.data_mix = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({
            data
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note } = this.state.data;
        if(!note){
            note = ''
        }
        jobReport.put(plant_id, dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note).then(({ data }) => {
            this.setState({
                loading: false
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

        const { plant, data, errors, loading }  = this.state;
        const { dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note } = data;
        const { toggleList, role, pointer, privileges } = this.props;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);
        console.log(plant)
        return (
            <React.Fragment>
                {plant.status !== 'Bartur ne Friz' && role === 'admin' || (privileges.access_job_report && !plant.job_report.is_put) ?
                    <div className={`timeline-info ${pointer === 2 ? 'active' : ''}`} >
                        <div className={`timeline-click`}>
                            <span className="title" onClick={toggleList.bind(this)} >
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().raport_generate}
                            </span>
                        </div>
                        <div className={`timeline-show ${pointer === 2 ? 'active' : ''}`}>
                            <div className={`timline-helper`}>
                                <div className={`left-timeline`}>
                                    <img src="./assets/img/circle.svg" alt="" />
                                    <div className="line">
                                        <div className="line-wrapper"></div>
                                    </div>
                                </div>
                                <div className={`right-timeline`}>
                                    <div className={`progress`} >
                                        {!plant.job_report ?
                                            <span>{today}</span>
                                            :
                                            <React.Fragment>
                                                <span>{plant.job_report.date}</span>
                                                <span><img src="./assets/img/circle.svg" alt="" /></span>
                                                <span>Start</span>
                                                <span>{plant.job_report.time}</span>
                                                <span><img src="./assets/img/circle.svg" alt="" /></span>
                                                <span>{plant.job_report.user.name}</span>
                                            </React.Fragment>
                                        }
                                    </div>
                                    <div className={`progress-content`}>
                                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                                            <div className="materials">
                                                {this.renderInput("dru_bungu", null, 'dru_bungu', dru_bungu, this.handleChange, errors.dru_bungu, false, `${getLanguage().o_wood}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("dru_ahu", null, 'dru_ahu', dru_ahu, this.handleChange, errors.dru_ahu, false, `${getLanguage().b_wood}` , false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("krunde", null, 'krunde', krunde, this.handleChange, errors.krunde, false, `${getLanguage().bran}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("miser_bluar", null, 'miser_bluar', miser_bluar, this.handleChange, errors.miser_bluar, false, `${getLanguage().grinded_corn}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("gips", null, 'gips', gips, this.handleChange, errors.gips, false, `${getLanguage().grinded_corn}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("shkums", null, 'shkums', shkums, this.handleChange, errors.shkums, false, `${getLanguage().shkums}`, false, 'number')}
                                            </div>
                                            {/* <div className="materials">
                                                {this.renderDatePicker(false, "data_mix", "data_mix:", 'data_mix', data_mix, this.onDatePickerChange, errors.data_mix, false, false, false, "Data", false, 'number')}
                                            </div> */}
                                            <div className="materials">
                                                {this.renderInput("uje", null, 'uje', uje, this.handleChange, errors.uje, false, `${getLanguage().uj}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("nr_bllokave", null, 'nr_bllokave', nr_bllokave, this.handleChange, errors.nr_bllokave, false, `${getLanguage().block_nr}`, false, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("kese", null, 'kese', kese, this.handleChange, errors.kese, false, `${getLanguage().kese}`, false, 'number')}
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
                    </div> 
                    :
                    <div className={`timeline-info ${pointer === 2 ? 'active' : ''}`} >
                        <div className={`timeline-click `}>
                            <span  onClick={toggleList.bind(this)}  className="title">
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().generate_report}
                            </span>
                        </div>
                        <div className={`timeline-show ${pointer === 2 ? 'active' : ''}`}>
                            <div className={`timline-helper`}>
                                <div className={`left-timeline`}>
                                    <img src="./assets/img/circle.svg" alt="" />
                                    <div className="line">
                                        <div className="line-wrapper"></div>
                                    </div>
                                </div>
                                <div className={`right-timeline`}>
                                    <div className={`progress`} >
                                        <span>{plant.job_report.date}</span>
                                        <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>Start</span>
                                        <span>{plant.job_report.time}</span>
                                        <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>{plant.job_report.user.name}</span>
                                    </div>
                                    <div className={`progress-content`}>
                                        <div className="materials">
                                            <span>{getLanguage().dru_bungu}: {dru_bungu}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().dru_ah}: {dru_ahu}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().miser}: {miser_bluar}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().gips}: {gips}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().shkums}: {shkums}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().water}: {uje}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().block_nr}: {nr_bllokave}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().kese}: {kese}</span>
                                        </div>
                                        <div className="materials">
                                            <span>{getLanguage().note}: {note}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}

export default GenerateReport;