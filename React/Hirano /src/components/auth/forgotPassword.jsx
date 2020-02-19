import React from 'react';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import authService from '../../services/authService';
import * as toast from '../../all/toast'
import { getCurrentUser } from '../../services/authService';

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
            else window.location = '/';
        }).catch(err => {
            this.setState({
                loading: false
            });
        });
    }

    render() { 
        if (getCurrentUser()) this.props.history.push('/')

        const { toggleCurrentTab } = this.props;
        const { data, errors, loading } = this.state;
        const { email } = data;
        return ( 
            <React.Fragment>
                <div className={`login`}>
                    <div className={`login-box`}>
                        <div className={`logo`}>
                            <img src="../assets/img/logo.png" alt=""/>
                        </div>
                        <div className={`form`}>
                            <form onSubmit={this.handleSubmit} action="">
                                {this.renderInput("email", null, 'email', email, this.handleChange, errors.email, false, "Email")}
                                <div className={`button-wrapper`} >
                                    {this.renderSubmitButton("Log in", loading)}
                                </div>
                                <div className="bottom-part">
                                    <span>Back to, <p onClick={() => toggleCurrentTab('login')}>Log in</p></span>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ForgotPassword;