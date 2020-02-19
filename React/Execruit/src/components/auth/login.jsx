import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import authService from '../../services/authService';
import * as toast from '../../all/toast'
import { Link } from 'react-router-dom'

class Login extends Form {
    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {},
        loading: false
    }

    schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    componentWillReceiveProps() {
        const { data } = this.state;
        data.password = '';
        this.setState({
            data
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        });
        const { email, password } = this.state.data;
        authService.login(email, password).then((data) => {
            if (data.error) {
                toast.error(data.error);

                this.setState({
                    loading: false
                });
            }
            else window.location = '/profile';
        })
    }

    render() {
        const { toggleCurrentTab } = this.props;
        const { data, errors, loading } = this.state;
        const { email, password } = data;

        return (
            <React.Fragment>
                <div className={`login-parent`}>
                    <div className={`login-first`}>
                        <div className="login">
                            <div className={'logo'}>
                                <img src="../img/new-logo.png" alt="" />
                            </div>
                            <div className="formlabel">
                                <span>Login
                                    <div className="div-helper"></div>
                                </span>
                            </div>
                            <form onSubmit={this.handleSubmit} className="form">
                                {this.renderInput("email", null, 'emaillogin', email, this.handleChange, errors.email, false, "Email")}
                                {this.renderInput("password", null, "passwordemail", password, this.handleChange, errors.password, false, "Password", false, "password")}
                                <div className="middle-part">
                                    {/* {this.renderCheckbox('rememberme', 'Remember Me:', 'rememberme', this.handleChange, errors.rememberme, true, false)}
                                    <p>Remember me</p> */}
                                    <Link onClick={() => toggleCurrentTab('forgot')}>Forgot Password?</Link>
                                    <div className="loginButton">
                                        {this.renderSubmitButton("Log in", loading)}
                                    </div>
                                    {/* <LinkedInPage /> */}
                                </div>
                            </form>
                            <div className="bottom-part">
                                <span>Not registered yet? Please, <Link onClick={() => toggleCurrentTab('register')}>Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                    <div className={`login-second`}>
                        <div className="overlay"></div>
                        <img src="../img/office1.jpeg" alt="" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;