import React from 'react';
import Form from '../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../all/toast';
import employmentService from '../../../services/employmentService';
import { setHasChanges } from '../../../globalVariables';
import { Dropdown } from 'semantic-ui-react'
import startMonthJson from '../../../json/startMonth.json'
import startYearJson from '../../../json/startYear.json'

class AddEmpHistory extends Form {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                user_id: this.props.id,
                job_title: '',
                employer_name: '',
                start_month: '',
                start_year: '',
                end_month: '',
                end_year: '',
                job_city: '',
                emp_web: '',
                job_description: '',
                checkboxToggle: false
            },
            errors: {},
            loading: false,
            maxCounter: 400
        }
    }

    schema = {
        user_id: Joi.number().integer().allow('').optional(),
        id: Joi.number().integer().allow('').optional(),
        job_title: Joi.string().required().label("Job Title"),
        employer_name: Joi.string().required().label("Employer Name"),
        start_month: Joi.string().required().label("Start Month"),
        start_year: Joi.number().integer().label("Start Year"),
        end_month: Joi.string().allow("").optional().label("End Month"),
        end_year: Joi.number().integer().allow("").optional().label("End Year"),
        job_city: Joi.string().required().label("City"),
        emp_web: Joi.string().allow('').optional(),
        job_description: Joi.string().allow('').optional(),
        index: Joi.number().integer().allow('').optional(),
        checkboxToggle: Joi.boolean().allow('').optional()
    }

    componentWillReceiveProps(props) {
        let { data } = this.state
        data = props.data;
        if (data.start_month === "None") {
            data.start_month = '';
        }
        if (data.end_month === 'None') {
            data.end_month = '';
        }
        this.setState({
            data
        })
    }

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
        if (JSON.stringify(this.props.data.start_month) !== JSON.stringify(this.state.data.start_month)) {
            setHasChanges(false);
        }
        else {
            setHasChanges(true);
        }
        if (JSON.stringify(this.props.data.start_year) !== JSON.stringify(this.state.data.start_year)) {
            setHasChanges(false);
        }
        else {
            setHasChanges(true);
        }
    }

    componentWillUpdate() {
        let { data } = this.state
        if (data.checkboxToggle) {
            this.schema.end_month = Joi.string().allow('').optional()
            this.schema.end_year = Joi.string().allow('').optional()
        } else {
            this.schema.end_month = Joi.string().required()
            this.schema.end_year = Joi.string().required()
        }
    }



    onChangeEndDate = date => {
        const { data } = this.state;
        data.end_month = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({ data })
    }

    onChangeStartDate = date => {
        const { data } = this.state;
        data.start_month = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({ data })
    }

    onChangeCheckBox = event => {
        let { data } = this.state;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        data.checkboxToggle = value;
        this.setState({
            data
        });
    };

    submitForm = () => {
        const { data } = this.state;
        this.setState({
            loading: true
        })
        const { id, user_id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle } = this.state.data;
        if (id) {
            employmentService.employment_history(id, user_id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle).then(({ response }) => {
                this.setState({
                    loading: false
                })
                setHasChanges(false);
                toast.success("Successfully edited User.")
            }).catch(err => {
                this.setState({
                    loading: false
                })
                toast.error("Something went wrong. Please try again")
            })
        }
        else {
            employmentService.employment_history2(user_id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle).then(({ data: response }) => {
                data.id = response.empId;
                this.setState({
                    loading: false,
                    data
                })
                setHasChanges(false);
                toast.success("Successfully edited User.")
            }).catch(err => {
                this.setState({
                    loading: false
                })
                toast.error("Something went wrong. Please try again")
            })
        }
    }

    onDeleteClick(id, index) {
        const { data } = this.state;
        employmentService.employment_history_delete(id).then(() => {
            data.id = '';
            this.setState({
                data
            })
            this.props.onDelete(index);
        }).catch(() => {
            toast.error('Something went wrong. Please refresh the page.')
        })

    }

    handleChangeStartMonth = (e, { value }) => {
        const { data } = this.state;
        startMonthJson.start_Month.forEach(element => {
            if (element.value === value) {
                data.start_month = element;
            }
        });
        data.start_month = value;
        this.setState({
            data
        });
    };
    handleChangeStartYear = (e, { value }) => {
        const { data } = this.state;
        startYearJson.start_year.forEach(element => {
            if (element.value === value) {
                data.start_year = element;
            }
        });
        data.start_year = value;
        this.setState({
            data
        });
    };
    handleChangeEndMonth = (e, { value }) => {
        const { data } = this.state;
        startMonthJson.start_Month.forEach(element => {
            if (element.value === value) {
                data.end_month = element;
            }
        });
        data.end_month = value;
        this.setState({
            data
        });
    };
    handleChangeEndYear = (e, { value }) => {
        const { data } = this.state;
        startYearJson.start_year.forEach(element => {
            if (element.value === value) {
                data.end_year = element;
            }
        });
        data.end_year = value;
        this.setState({
            data
        });
    };

    render() {
        const { data, errors, loading, maxCounter } = this.state;
        const { id, job_title, employer_name, start_month, start_year, end_month, end_year, job_city, emp_web, job_description, checkboxToggle } = data;
        const { index, canAdd, addMore } = this.props;
        let counter = maxCounter - job_description.length;
        return (
            <div className="form-head">
                <form key={index} onSubmit={this.handleSubmit}>
                    {this.renderInput("job_title", null, 'job_title', job_title, this.handleChange, errors.job_title, false, "Job Title")}
                    {this.renderInput("employer_name", null, 'employer_name', employer_name, this.handleChange, errors.employer_name, false, "Employer")}
                    {this.renderInput("job_city", null, 'job_city', job_city, this.handleChange, errors.job_city, false, "City")}
                    {this.renderInput("emp_web", null, 'emp_web', emp_web, this.handleChange, errors.emp_web, false, "Company Web")}
                    <div className={`input-form`}>
                        <Dropdown
                            placeholder='Start Month'
                            onChange={this.handleChangeStartMonth}
                            fluid
                            search
                            selection
                            value={start_month}
                            defaultOpen={false}
                            options={startMonthJson.start_Month}
                        />
                    </div>
                    <div className={`input-form`}>
                        <Dropdown
                            placeholder='Start Year'
                            onChange={this.handleChangeStartYear}
                            fluid
                            search
                            selection
                            value={start_year}
                            defaultOpen={false}
                            options={startYearJson.start_year}
                        />
                    </div>
                    <div className={`input-form`}>
                        <Dropdown
                            placeholder='End Month'
                            onChange={this.handleChangeEndMonth}
                            fluid
                            search
                            selection
                            value={end_month}
                            defaultOpen={false}
                            options={startMonthJson.start_Month}
                            disabled={checkboxToggle}
                        />
                        <div className={"presentdiv"}>
                            <input className={'checkbox-input'} onClick={this.onChangeCheckBox} type="checkbox" checked={checkboxToggle} />
                            <label >Present</label>
                        </div>
                    </div>

                    <div className={`input-form`}>
                        <Dropdown
                            placeholder='End Year'
                            onChange={this.handleChangeEndYear}
                            fluid
                            search
                            selection
                            value={end_year}
                            defaultOpen={false}
                            options={startYearJson.start_year}
                            disabled={checkboxToggle}
                        />
                    </div>
                    {this.renderTextArea(maxCounter, "job_description", `Include 2-3 sentences about your experience (${counter} characters left):`, "job_description", job_description, this.handleChange, errors.job_description, false, false, 7, 10)}
                    <div className="form-buttons">
                        {this.renderSubmitButton("Save", loading, "")}
                        {canAdd && id &&
                            <button type="button" onClick={addMore} >Add More</button>
                        }
                        {id &&
                            <button type="button" onClick={this.onDeleteClick.bind(this, id, index)} >Delete</button>
                        }
                    </div>
                </form>
                {!canAdd && id &&
                    <div className="bottom-line"></div>
                }
            </div>
        );
    }
}

export default AddEmpHistory;