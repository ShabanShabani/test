import React from 'react';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import * as toast from '../../all/toast'

class ForgotPassword extends Form {
    state = {
        data: {
            email: ''
        },
        errors: {},
        loading: false
    }

    schema = {
        email: Joi.string().email().required()
    }


    submitForm = () => {
        this.setState({
            loading: true
        });

        const { email } = this.state.data;
        authService.forgotPassword(email).then((data) => {
            if (data.error) {
                toast.error(data.error);

                this.setState({
                    loading: false
                });

            }
            else window.location = '/forgot-password';
        })
    }


    render() {
        const { toggleCurrentTab } = this.props;
        const { data, errors, loading } = this.state;
        const { email } = data;

        return (
            <div className={`auth`} >
                <div className={`login-auth active`}>
                    <div className={`login`}>
                        <div className={`login-box`}>
                            <div className={'logo'}>
                                <img src="../img/new-logo.png" alt="" />
                            </div>
                            <form onSubmit={this.handleSubmit} className="form">
                                {this.renderInput("email", null, "email", email, this.handleChange, errors.email, false, "Email", false, "email")}
                                <div className="middle-part">
                                    <div className="loginButton">
                                        {this.renderSubmitButton("Send Email", loading)}
                                    </div>
                                </div>
                            </form>
                            <div className="bottom-part">
                                <span>Back to, <Link onClick={() => toggleCurrentTab('login')}>Log in</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ForgotPassword;