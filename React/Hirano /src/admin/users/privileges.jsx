import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'
import userService from '../../services/userService';

class Privileges extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id:'',
                access_dashboard: false,
                access_job_report: false,
                access_mixer_block_production: false,
                access_mixer_block_production_end: false,
                access_average_weight_substrates: false,
                access_autoclave: false,
                access_autoclave_end: false,
                access_inoculation_room: false,
                access_control_infected_substrates: false,
                access_harvesting: false,
                access_sort_package: false,
                access_temperatures: false,
                access_reports: false,
                access_stock: false,
                access_fridge: false,
                access_users: false,
            },
            errors: {},
            loading: false
        };
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        access_dashboard: Joi.boolean().allow('').optional(),
        access_job_report: Joi.boolean().allow('').optional(),
        access_mixer_block_production: Joi.boolean().allow('').optional(),
        access_mixer_block_production_end: Joi.boolean().allow('').optional(),
        access_average_weight_substrates: Joi.boolean().allow('').optional(),
        access_autoclave: Joi.boolean().allow('').optional(),
        access_autoclave_end: Joi.boolean().allow('').optional(),
        access_inoculation_room: Joi.boolean().allow('').optional(),
        access_control_infected_substrates: Joi.boolean().allow('').optional(),
        access_harvesting: Joi.boolean().allow('').optional(),
        access_sort_package: Joi.boolean().allow('').optional(),
        access_temperatures: Joi.boolean().allow('').optional(),
        access_reports: Joi.boolean().allow('').optional(),
        access_stock: Joi.boolean().allow('').optional(),
        access_fridge: Joi.boolean().allow('').optional(),
        access_users: Joi.boolean().allow('').optional()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {data} = this.state;
        if(nextProps.userRow && nextProps.userRow.id)
        {
            const { id, access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users } = nextProps.userRow;
            data.id = id;
            data.access_dashboard= access_dashboard;
            data.access_job_report= access_job_report;
            data.access_mixer_block_production= access_mixer_block_production;
            data.access_mixer_block_production_end= access_mixer_block_production_end;
            data.access_average_weight_substrates= access_average_weight_substrates;
            data.access_autoclave= access_autoclave;
            data.access_autoclave_end= access_autoclave_end;
            data.access_inoculation_room= access_inoculation_room;
            data.access_control_infected_substrates= access_control_infected_substrates;
            data.access_harvesting= access_harvesting;
            data.access_sort_package= access_sort_package;
            data.access_temperatures= access_temperatures;
            data.access_reports= access_reports;
            data.access_stock= access_stock;
            data.access_fridge= access_fridge;
            data.access_users= access_users;
            this.setState({
                data
            })
            this.schema.password =  Joi.string().allow('').optional()  
        }else{
            data.id='';
            data.access_dashboard= false;
            data.access_job_report= false;
            data.access_mixer_block_production= false;
            data.access_mixer_block_production_end= false;
            data.access_average_weight_substrates= false;
            data.access_autoclave= false;
            data.access_autoclave_end= false;
            data.access_inoculation_room= false;
            data.access_control_infected_substrates= false;
            data.access_harvesting= false;
            data.access_sort_package= false;
            data.access_temperatures= false;
            data.access_reports= false;
            data.access_stock= false;
            data.access_fridge= false;
            data.access_users= false;
            this.schema.password =  Joi.string().min(4).required().label('Password')
            this.setState({
                data
            })
        }
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const {id, access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users } = this.state.data;
        
        userService.editAccess(id, access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users).then(({ data }) => {
            this.props.togglePopupPrivileges();
            this.props.tableWillUpdate();
            this.setState({
                loading: false
            })
            toast.success("Useri u editua me sukses.");
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    render() { 
        const { togglePrivileges, togglePopupPrivileges } = this.props;
        const { data, errors, loading } = this.state;
        const { access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users } = data;
        return ( 
            <div className={`popup-form popup-access ${togglePrivileges ? 'active privileges' : ''}`}>
                <div className={`popup-inside`}>
                    <img onClick={togglePopupPrivileges} className="plus" src="./assets/img/plus-color.svg" alt=""/>
                    <form onSubmit={this.handleSubmit} >
                        <span>Edito Privilegjet</span>
                        <div className="inputs">
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_dashboard", null, 'access_dashboard', access_dashboard, this.handleChange, errors.access_dashboard, false,false, "access_dashboard")}
                                    </label>
                                    <span>Access Dashboard</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_job_report", null, 'access_job_report', access_job_report, this.handleChange, errors.access_job_report, false,false, "access_job_report")}
                                    </label>
                                    <span>Access Job Report</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_mixer_block_production", null, 'access_mixer_block_production', access_mixer_block_production, this.handleChange, errors.access_mixer_block_production, false,false, "access_mixer_block_production")}
                                    </label>
                                    <span>Access Mixer Block Production</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_mixer_block_production_end", null, 'access_mixer_block_production_end', access_mixer_block_production_end, this.handleChange, errors.access_mixer_block_production_end, false,false, "access_mixer_block_production_end")}
                                    </label>
                                    <span>Access Mixer Block Production End</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_average_weight_substrates", null, 'access_average_weight_substrates', access_average_weight_substrates, this.handleChange, errors.access_average_weight_substrates, false,false, "access_average_weight_substrates")}
                                    </label>
                                    <span>Access Average Weught Substrates</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_autoclave", null, 'access_autoclave', access_autoclave, this.handleChange, errors.access_autoclave, false,false, "access_autoclave")}
                                    </label>
                                    <span>Access Autoclave</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_autoclave_end", null, 'access_autoclave_end', access_autoclave_end, this.handleChange, errors.access_autoclave_end, false,false, "access_autoclave_end")}
                                    </label>
                                    <span>Access Autoclave End</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_inoculation_room", null, 'access_inoculation_room', access_inoculation_room, this.handleChange, errors.access_inoculation_room, false,false, "access_inoculation_room")}
                                    </label>
                                    <span>Access Inoculation Room</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_control_infected_substrates", null, 'access_control_infected_substrates', access_control_infected_substrates, this.handleChange, errors.access_control_infected_substrates, false,false, "access_control_infected_substrates")}
                                    </label>
                                    <span>Access Control Infected Substrates</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_harvesting", null, 'access_harvesting', access_harvesting, this.handleChange, errors.access_harvesting, false,false, "access_harvesting")}
                                    </label>
                                    <span>Access Harvesting</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_sort_package", null, 'access_sort_package', access_sort_package, this.handleChange, errors.access_sort_package, false,false, "access_sort_package")}
                                    </label>
                                    <span>Access Sort Package</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_temperatures", null, 'access_temperatures', access_temperatures, this.handleChange, errors.access_temperatures, false,false, "access_temperatures")}
                                    </label>
                                    <span>Access Temperatures</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_reports", null, 'access_reports', access_reports, this.handleChange, errors.access_reports, false,false, "access_reports")}
                                    </label>
                                    <span>Access Reports</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_stock", null, 'access_stock', access_stock, this.handleChange, errors.access_stock, false,false, "access_stock")}
                                    </label>
                                    <span>Access Stock</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_fridge", null, 'access_fridge', access_fridge, this.handleChange, errors.access_fridge, false,false, "access_fridge")}
                                    </label>
                                    <span>Access Fridge</span>
                                </div>
                            </div>
                            <div className="input-field input-form input-control">
                                <span className={`input-name`}>    </span>
                                <div className={`choose input-form input-control`}>
                                    <label className="checkbox-inside">
                                        {this.renderCheckbox("access_users", null, 'access_users', access_users, this.handleChange, errors.access_users, false,false, "access_users")}
                                    </label>
                                    <span>Access Users</span>
                                </div>
                            </div>
                            <div className={`popup-button`}>
                                {this.renderSubmitButton("Save", loading)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Privileges;