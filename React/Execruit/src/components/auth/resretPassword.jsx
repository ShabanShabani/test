import React from 'react';
import Form from '../../all/common/form';
import authService from '../../services/authService';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'

class ResetPassword extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                password: '',
                confirmPassword: '',
                token: props.match.params.token,
            },
            errors: {},
            loading: false,
        }
    }

    schema = {
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        token: Joi.string().required(),
    }

    componentWillReceiveProps() {
        const { data } = this.state;
        data.password = '';
        this.setState({
            data
        })
    }

    submitForm = () => {
        const { data } = this.state;
        this.setState({
            loading: true
        })
        authService.changePassowrd(data.password, data.token).then(({ data: response }) => {
            toast.success("Successfully changed password.")
            this.setState({
                loading: false
            })
            window.location = '/';
        }).catch(err => {
            this.setState({
                loading: false
            })
            toast.error("Something went wrong. Please try again")
        })
    }


    render() {
        const { data, errors, loading } = this.state;
        const { password, confirmPassword } = data;

        return (
            <React.Fragment>
                <div className={"auth"} >
                    <div className={"loginAuth active"}>
                        <div className={"login-parent"}>
                            <div className={`login-first`}>
                                <div className="login">
                                    <div className={'logo'}>
                                        <img src="../assets/img/logo.png" alt="" />
                                    </div>
                                    <div className="formlabel">
                                        <span>Reset Password
                                            <div className="div-helper"></div>
                                        </span>
                                    </div>
                                    <div className="form">
                                        <form onSubmit={this.handleSubmit} action="">
                                            {this.renderInput("password", null, "password", password, this.handleChange, errors.password, false, "New Password", false, "password")}
                                            {this.renderInput("confirmPassword", null, "confirmPassword", confirmPassword, this.handleChange, errors.password, false, "Confirm New Password", false, "password")}
                                            <div className="loginButton">
                                                {this.renderSubmitButton("Save", loading)}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className={`login-second`}>
                                <div className="overlay"></div>
                                <img src="../img/office1.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ResetPassword;