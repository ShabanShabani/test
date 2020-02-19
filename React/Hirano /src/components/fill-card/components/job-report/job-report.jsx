import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import jobReport from '../../../../services/jobReport';
import { getLanguage } from "../../../global/language"

class JobReport extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                anticipated_quantity: this.props.plant.nr_predicted_blocks,
            },
            errors: {},
            loading:'',
        }
    }

    schema = {
        plant_id: Joi.number().integer().required(),
        anticipated_quantity: Joi.number().integer().required(),
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.plant.job_report)
        {
            const { data } = this.state;
            data.anticipated_quantity= newProps.plant.job_report.nr_bllokave;
            this.setState({
                data,
                plant: newProps.plant
            })
        }
    }
 
    submitForm = () => {
        this.setState({
            loading: true
        })
        const { plant_id, anticipated_quantity } = this.state.data;

        jobReport.post(plant_id, anticipated_quantity ).then(({ data }) => {
            this.setState({
                loading: false
            })
            toast.success("U ruajt me sukses.");
            this.props.updatePlant();
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const { plant, data, errors, loading } = this.state;
        const { toggleList, role, pointer, privileges } = this.props;
        const { anticipated_quantity } = data;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);
        return (
            <React.Fragment>
                {plant.status !== 'Bartur ne Friz' && role === 'admin' || (privileges.access_job_report && plant.job_report === null) ?
                    <div onClick={toggleList.bind(this)} className={`timeline-info ${pointer === 1 ? 'active' : ''}`} >
                        <div className={`timeline-click`}>
                            <span className="title">
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().job_report}
                            </span>
                        </div>
                        <div className={`timeline-show ${pointer === 1 ? 'active' : ''}`}>
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
                                        <form autoComplete="off" onSubmit={this.handleSubmit} >
                                            <div className="materials">
                                                {this.renderInput("anticipated_quantity", null, 'anticipated_quantity', anticipated_quantity, this.handleChange, errors.anticipated_quantity, false, `${getLanguage().estimated_quantity}`)}
                                            </div>
                                            <div className="form-button">
                                                {/* <button>Gjenero Raport</button> */}
                                                {this.renderSubmitButton(`${getLanguage().save_data}`, loading)}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`timeline-info ${pointer === 1 ? 'active' : ''}`} >
                        <div className={`timeline-click `}>
                            <span  onClick={toggleList.bind(this)}  className="title">
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().job_report}
                            </span>
                        </div>
                        <div className={`timeline-show ${pointer === 1 ? 'active' : ''}`}>
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
                                        {/* <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span> */}
                                        <div className="materials">
                                            <span> {getLanguage().estimated_quantity}: {anticipated_quantity}</span>
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

export default JobReport;