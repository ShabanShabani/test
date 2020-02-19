import React from 'react';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import * as toast from '../../all/toast';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

class UserRegister extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                role: 'user',
                password: '',
                confirmPassword: '',
                checkboxToggle: false


            },
            errors: {},
            loading: false
        }
    }


    schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required().label('role'),
        // password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        password: Joi.string().required().min(8),
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
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({
                language: {
                    any: {
                        allowOnly: '!!Passwords do not match',
                    }
                }
            }),
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
            // data.passwordValid = true;
        }
        else {
            // data.passwordValid = false;
            error.details.forEach(err => {
                errors[err.path[0]] = 'Passwords do not match';
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
        const { firstName, lastName, userName, email, role, password } = this.state.data;
        const user = {
            firstName,
            lastName,
            userName,
            email,
            role,
            password
        }

        userService.add(user).then(({ data }) => {
            window.location = '/';
            toast.success("Successfully Created User, You Can Now Log In.");

        }).catch(err => {
            if (err.response.data.error === "Username already exists")
                toast.error("This username is already being used");
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
        const { data, errors } = this.state;
        const { firstName, lastName, userName, email, password, confirmPassword, checkboxToggle } = data;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="form">
                    {this.renderInput("firstName", null, 'firstName', firstName, this.handleChange, errors.firstName, false, "First Name")}
                    {this.renderInput("lastName", null, 'lastName', lastName, this.handleChange, errors.lastName, false, "Last Name")}
                    {this.renderInput("userName", null, 'userName', userName, this.handleChange, errors.userName, false, "Username (Used to generate your CV link)")}
                    {this.renderInput("email", null, 'emailuser', email, this.handleChange, errors.email, false, "Email")}
                    {this.renderInput("password", null, "password", password, this.handleChange, errors.password, false, "Password", false, "password")}
                    {this.renderInput("confirmPassword", null, "confirmPassword", confirmPassword, this.handleConfirmPasswordChange, errors.confirmPassword, false, "Confirm Password", false, "password")}
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
        );
    }
}

export default UserRegister;