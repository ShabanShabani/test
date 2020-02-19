import React from 'react';
import Form from '../../all/common/form';
import authService from '../../services/authService';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'
import { getLanguage } from '../global/language'

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
            else window.location = '/';
        })
    }

    render() { 

        const { data, errors, loading } = this.state;
        const { email, password } = data;
        const { toggleCurrentTab } = this.props;

        return ( 
            <React.Fragment>
                <div className={`login`}>
                    <div className={`login-box`}>
                        <div className={`logo`}>
                            <img src="../assets/img/logo.png" alt=""/>
                        </div>
                        <div className={`form`}>
                            <form onSubmit={this.handleSubmit} action="">
                                {this.renderInput("email", null, 'email', email, this.handleChange, errors.email, false, getLanguage().email)}
                                {this.renderInput("password", null, "password", password, this.handleChange, errors.password, false, getLanguage().password  , false, "password")}
                                <div className="content" >
                                    <span></span>
                                    <p onClick={() => toggleCurrentTab('forgot')}>{getLanguage().forgot_password}</p>
                                </div>
                                <div className={`button-wrapper`} >
                                    {/* <button>Log In</button> */}
                                    {this.renderSubmitButton(getLanguage().login1, loading)}

                                    {/* <Link to="/home">Log In</Link> */}
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Login;