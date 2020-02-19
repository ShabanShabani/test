import React from 'react';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import { Link } from 'react-router-dom';
import * as toast from '../../all/toast'
import userService from '../../services/userService';
import { getCurrentUser } from '../../services/authService';

class CompanyRegister extends Form {
    state = {
        data: {
            name: '',
            nui: '',
            email: '',
            password: '',
            confirmPassword: '',
            checkboxToggle: false
        },
        isToggleList: 'user',
        errors: {},
        loading: false
    }

    schema = {
        name: Joi.string().required(),
        nui: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        // confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({
            language: {
                any: {
                    allowOnly: '!!Passwords do not match',
                }
            }
        }),
        checkboxToggle: Joi.boolean().allow('').optional()
    }

    componentWillReceiveProps() {
        const { data } = this.state;
        data.password = '';
        data.confirmPassword = '';
        this.setState({
            data
        })
    }

    handleConfirmPasswordChange = ({ currentTarget: input }) => {
        const schema = {
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        }
        let fieldName = input.name;

        const { data, errors } = this.state;
        const { password, confirmPassword } = data;

        let obj;

        if (fieldName === 'password') {
            obj = {
                password: input.value,
                confirmPassword
            }
            data.password = input.value;
        }
        else {
            obj = {
                password,
                confirmPassword: input.value
            }
            data.confirmPassword = input.value;
        }

        const { error } = Joi.validate(obj, schema);
        delete errors['confirmPassword'];
        delete errors['password'];
        if (!error) {
        }
        else {
            error.details.forEach(err => {
                errors[err.path[0]] = 'error';
            })
        }
        data[input.name] = input.value;

        this.setState({
            data,
            errors
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const { name, nui, email, password } = this.state.data;

        userService.addCompany(name, nui, email, password).then(({ data }) => {
            window.location = '/';
            toast.success("Successfully Created User, You Can Now Log In.");
        }).catch(err => {
            if (err.response.data.error === "NUI already exists")
                toast.error("This NUI is already being used");
            else if (err.response.data.error === "Email already exists")
                toast.error("This email address is already being used");
            else
                toast.error("Something went wrong. Please try again");
            this.setState({
                loading: false
            })
        })
        this.setState({
            loading: false,
        });
    }

    render() {
        if (getCurrentUser()) this.props.history.push('/')

        const { data, errors } = this.state;
        const { name, nui, email, password, confirmPassword, checkboxToggle } = data;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="form">
                    <div>
                        <span>Reminder: Company account need to be approved by Admin </span>
                    </div>
                    {this.renderInput("name", null, 'name', name, this.handleChange, errors.name, false, "Company Name")}
                    {this.renderInput("nui", null, 'nui', nui, this.handleChange, errors.nui, false, "NUI")}
                    {this.renderInput("email", null, 'email', email, this.handleChange, errors.email, false, "Email")}
                    {this.renderInput("password", null, "password", password, this.handleChange, errors.password, false, "Password", false, "password")}
                    {this.renderInput("confirmPassword", null, "confirmPassword", confirmPassword, this.handleChange, errors.confirmPassword, false, "Confirm Password", false, "password")}
                    <div className="middle-part">
                        {this.renderCheckbox('checkboxToggle', null, 'checkboxToggle', checkboxToggle, this.handleChange, errors.checkboxToggle, true, false)}
                        <p>I Accept the <Link to="/PrivacyPolicy">Terms Of Use</Link> & <Link to="/PrivacyPolicy">Privacy Policy</Link></p>
                        <div className="loginButton">
                            {/* {this.renderSubmitButton("Sign Up", loading)} */}
                            {checkboxToggle ?
                                <button type="submit" >Sign Up</button>
                                :
                                <button type="submit" disabled >Sign Up</button>
                            }
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default CompanyRegister;
